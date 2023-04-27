import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MediaService } from '../media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Member } from '../models/members';
import { Cast, Credits, Crew, MediaDetail, Similar, Video } from '../models/mediaDetail.new';
import { AddedMedia } from '../models/media-detail';
import { UtilService } from '../util.service';
// import { Media } from '../models/media-detail';


@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.css']
})
export class MediaDetailComponent implements OnInit, AfterViewInit {

  constructor(private mediaService: MediaService, private route: ActivatedRoute, private Router: Router, private util: UtilService) { }

  mediaDetail?: MediaDetail;
  Credits?: Credits;
  CrewMembers: Member[] = [];
  Cast: Cast[] = [];
  similarResults: Similar[] = [];
  isLoading: Boolean = false;
  trailerPath: string = "";
  showVideoComponent: Boolean = false;
  titleAdded?: Boolean;

  /* FUNZIONE INIZIALIZZAZIONE COMPONENTE ANGULAR */
  ngOnInit(): void {
    this.isLoading = true; //componente in caricamento ...

    /* Per gestione similars: quando ne seleziono uno mantengo la stessa rotta ma la ricarico con id differente */
    this.Router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    } //reuseStrategy

    const id = this.route.snapshot.paramMap.get("id"); //otteng l'id del media
    /* richiesta dettaglio */
    if (id) {
      this.getMediaDetail(id);

    }//endIf


  } //ngOnInit

  /* FUNZIONE INIZIALIZZAZIONE COMPLETATA */
  ngAfterViewInit() {
    setTimeout(() => this.isLoading = false, 500);
    this.checkTitleAdded();
  } //ngAfterViewInit

  /* */

  /** -----------------------------------------
    GESTIONE RISULTATI MEDIA DETAIL RESPONSE
  ------------------------------------------ */

  /* FUNZIONE RICHIESTA DETTAGLIO */
  getMediaDetail(id: string) {

    this.mediaService.getMediaDetail(id)
      .subscribe(res => { // intercetto la risposta della chiamata ajax
        this.mediaDetail = res; //dettaglio generale
        this.Cast = res.credits.cast; //cast
        this.CrewMembers = this.creditsByJob(res.credits.crew); //chiamata funzione filtraggio risultati
        this.similarResults = this.excludeResultsWithoutPath(res.similar.results); //chiamata funzione esclusione risultati senza immagine
        this.trailerPath = this.checkIfTrailer(res.videos.results); //chiamata funzione controllo trailer
      }); //endRequestMediaDetail

  } //getMediaDetail

  /* FUNZIONE CHE FILTRA I MEMBRI DELLA CREW PER VISUALIZZARE SOLO I RISULTATI SCELTI */
  creditsByJob(crew: Crew[]): Member[] {
    let crewM: Crew[] = [];
    let MembersJobs: Member[] = [];

    /* ricerca all'interno dell'array delle mansioni da visualizzare */
    for (let c of crew) {
      if (c.job == "Director") { // se si vuole vedere altro basta aggiungere in || altre mansioni, congruenti con quelle che si trovano nella response
        if (!crewM.find(n => n.name == c.name)) { // se la stessa persona svolge più mansioni è inserita più volte nell'array della response, quindi lo inserisco solo se non è già presente
          crewM.push(c);
        }//endIf
      } // endIf
    } //endFor

    /* per ogni membro della crew estratto cerco tutti le mansioni che svolge in tutta la response */
    for (let member of crewM) {
      let jobs = [];
      for (let c of crew) {
        if (member.name == c.name) {
          jobs.push(c.job);
        } //endIf
      } //endFor
      MembersJobs.push({ name: member.name, jobs: jobs }); // inserisco i membri estratti cojn tutte le loro mansioni in un'array, pronti per la visualizzazione
    } //endFor

    return MembersJobs;
  } //creditsByJob

  /* FUNZIONE PER ESCLUDERE I RISULTATI SIMILI SENZA IMMAGINE DI COPERTINA */
  excludeResultsWithoutPath(results: Similar[]): Similar[] {
    let similarsOk: Similar[] = [];

    for (let r of results) {
      if (r.backdrop_path) {
        similarsOk.push(r);
      } //endIf
    } //endFor

    return similarsOk;
  } //excludeResultsWithoutPath

  /* FUNZIONE PER CONTROLLARE SE TRA I VIDEO C'è UN TRAILER (Se non presente non verrà mostrato il pulsante per visulizzare il trailer)*/
  checkIfTrailer(videos: Video[]): string {

    /* controllo se il trailer o il teaser trailer sono presenti */
    let type = videos.find(res => res.type == "Trailer" || res.type == "Teaser");

    if (type && type?.key) { // se presente scrivo il link per l'iframe
      return this.trailerPath = 'https://www.youtube.com/embed/' + type.key;
    } //endIf

    return "";

  } //checkIfTrailer

  /* FUNZIONE POSTER */
  getPosterPath() {
    let size = 0;
    if (screen.width < 680 && screen.orientation != undefined) {
      size = 200;
    } else if (screen.width < 1200 && screen.orientation != undefined) {
      size = 400;
    } else {
      size = 500;
    }
    return `https://www.themoviedb.org/t/p/w${size}/${this.mediaDetail?.poster_path}`;
  } //getPosterPath

  /* FUNZIONE IMMAGINE DI SFONDO */
  getBackdropPath() {

    if (screen.width < 680 && screen.orientation != undefined) {
      return `${environment.BASE_URL_BACKDROP}w500${this.mediaDetail?.backdrop_path}`
    } else {
      return `${environment.BASE_URL_BACKDROP}w1000_and_h450_multi_faces${this.mediaDetail?.backdrop_path}`;
    }

  } //getBackdropPath
  // https://www.themoviedb.org/t/p/w1000_and_h450_multi_faces/fgw4rFs4XMWdJTWp1eMacHKQqbZ.jpg
  /* FUNZIONE INFORMAZIONI RELEASE */
  getReleaseInfo() {
    return `${this.mediaDetail?.release_date}`
  } // getReleaseInfo

  /* FUNZIONE CONVERSIONE DURATA IN ORE E MINUTI */
  timeConversion() {
    return `${Math.floor(this.mediaDetail!.runtime / 60)}h ${this.mediaDetail!.runtime % 60}min`
  } //timeConversion

  /* FUNZIONE CONTROLLO TITOLO AGGIUNTO A LISTA */
  checkTitleAdded() {
    let myList: AddedMedia[] = []
    this.mediaService.getMyList()
      .subscribe({
        next: (res) => {
          myList = res
          if (myList.length > 0) {
            //Ricerca del titolo visualizzato per verificare se presente sul DB
            if (myList.find(l => l.media.id == this.mediaDetail?.id)) {
              this.titleAdded = true;
            }//endIf
          }//endIf
        },//endNext
        error: (err) => { // se errore 401, chiamo funzione per pulire il localStorage
          if (this.util.parseErrorStatus(err) == 401) {
            this.mediaService.disconnectUser();
          }//endIf
        }//endError
      })//endSubscribe
  } //checkTitleAdded

  /* ---------------------------------------------------------------------------------------------------------------------------------------- */

  /** -----------------------------------------
    FUNZIONI DI UTILITA
  ------------------------------------------ */

  /* FUNZIONE APERTURA COMPONENTE VIDEO */
  showTrailer() {
    this.showVideoComponent = true;
  } //showTrailer

  /* FUNZIONE CHIUSURA COMPONENTE VIDEO */
  closeTrailer() {
    this.showVideoComponent = false;
  } //closeTrailer

  /* FUNZIONE AGGIUNGI A LISTA UTENTE */
  addToList() {
    if (this.mediaDetail) {
      this.mediaService.addToList()
        .subscribe(() => {
          this.checkTitleAdded();
        })
    }
  } //addToList

}
