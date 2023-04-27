import { Component, HostListener, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../media.service';
import { Media, Prev } from '../models/media-detail';
import { SingleTitleComponent } from '../my-list/single-title/single-title.component';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  infiniteScrolling() {

    if (!this.loadingResults) {
      this.getOffsetDistance();
    }
  }

  allTitles: Media[] = [];
  innerHeight: number = 0;
  offsetTop: number = 0;
  viewportRefHeight: number = 100;
  sliderDistanceTop: number = 50;
  onInitGeneration: number = 0;
  generatedOnInit: Boolean = false;
  loadingResults: Boolean = false;
  totalPages: number = 0;
  genreId: string = "";
  pagesShowed: number[] = [];

  constructor(private viewContainerRef: ViewContainerRef, private route: ActivatedRoute, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.generatedOnInit = false;
    this.innerHeight = window.innerHeight;
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.genreId = id;
      this.getFirstPage()
    }
  } // ngOnInit

  /* FUNZIONE GENERAZIONE PRIMA PAGINA */
  getFirstPage() {
    this.pagesShowed.push(1); // inserisce pagina 1 in array per check
    this.getDiscoverListByGenres(1);
  } // getFirstPage

  /* FUNZIONE DETERMINAZIONE PROSSIMA PAGINA DA VISUALIZZARE */
  checkPages() {
    let pageShow: number;
    this.loadingResults = true;

    /* Controllo pagine già visualizzate e scelta della prossima */
    for (let i = 1; i <= this.totalPages; i++) {
      if (!this.pagesShowed.includes(i)) {
        pageShow = i;
        this.pagesShowed.push(i);
        break;
      }
    }

    /* al caricamento iniziale mostro 2 pagine (40 risultati) per riempire la viewport */
    if (this.pagesShowed.length > 1) {
      this.generatedOnInit = true;
    }
    /* scrollando carico una alla volta le pagine successive */
    if (this.sliderDistanceTop > 0 || !this.generatedOnInit) {
      if (pageShow!) {
        this.getDiscoverListByGenres(pageShow)
      }
    }
  } // checkPages

  /* Chiamata API per ottenre risultati da visualizzare */
  getDiscoverListByGenres(page: number) {
    this.mediaService.getDiscoverListByGenres(Number(this.genreId), page)
      .subscribe(res => {
        this.totalPages = res.total_pages;
        this.allTitles = res.results as Media[];
        this.createComponentInstances(this.allTitles);
      })
  } // getDiscoverListByGenres

  /* FUNZIONE CREAZIONE ISTANZE DEI COMPONENTI DA VISUALIZZARE  */
  createComponentInstances(media: Media[]) {

    for (let m of media) {
      if (m.poster_path) {
        let cmp = this.viewContainerRef.createComponent(SingleTitleComponent);
        cmp.instance.title = m;
      }
    }

    if (!this.generatedOnInit) {

      this.getOffsetDistance();

    }

    this.loadingResults = false;

  }

  /* FUNZIONE DETERMINAZIONE DISTANZA SCROLLING */
  getOffsetDistance() {

    let slider = document.querySelector("app-single-title:last-of-type");
    let slideY = slider?.getBoundingClientRect().y;
    let slideHeight = slider?.getBoundingClientRect().height;
    let offset = 50;

    this.sliderDistanceTop = ((this.innerHeight + offset) - (slideY! + slideHeight!));

    if (this.sliderDistanceTop > 0 || !this.generatedOnInit) {
      this.checkPages();
    }

  } // getOffsetDistance
}
