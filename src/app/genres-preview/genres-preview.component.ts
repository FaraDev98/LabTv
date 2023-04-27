import { AfterViewInit, Component, ComponentRef, EventEmitter, HostListener, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Media } from '../models/media-detail';
import { MediaService } from '../media.service';
import { ListaMediaComponent } from '../lista-media/lista-media.component';
import { Genre } from '../models/genres';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-genres-preview',
  templateUrl: './genres-preview.component.html',
  styleUrls: ['./genres-preview.component.css']
})
export class GenresPreviewComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  infiniteScrolling() {

    if (!this.loadingResults) {
      this.getOffsetDistance();
    }
  }

  // @Input()


  @Output()
  onLoadingComponent = new EventEmitter<Boolean>()

  media: Media[] = [];
  genres: Genre[] = [];
  innerHeight: number = 0;
  offsetTop: number = 0;
  viewportRefHeight: number = 100;
  sliderDistanceTop: number = 50;
  onInitGeneration: number = 0;
  generatedOnInit: Boolean = false;
  loadingResults: Boolean = false;

  constructor(private viewContainerRef: ViewContainerRef, private mediaService: MediaService) { }


  ngOnInit(): void {
    this.generatedOnInit = false;
    this.innerHeight = window.innerHeight;
    this.getGenres()
  }

  getGenres() {
    this.mediaService.getGenres()
      .subscribe(res => {
        this.genres = res.genres;
        this.checkGenres();
      })

  }

  genreShowed: string[] = [];

  checkGenres() {
    let genreShow: Genre;
    this.loadingResults = true;
    for (let gen of this.genres) {
      if (!this.genreShowed.includes(gen.name)) {
        genreShow = gen;
        this.genreShowed.push(gen.name);
        break;
      }
    }

    if (this.sliderDistanceTop > 0 || !this.generatedOnInit) {
      if (genreShow!) {
        this.getDiscoverListByGenres(genreShow!.id, genreShow!.name)
      }
    } else {
      this.generatedOnInit = true;
    }
  }

  getDiscoverListByGenres(genre: number, name: string) {
    this.mediaService.getDiscoverListByGenres(genre, 1)
      .subscribe(res => {
        this.media = res.results as Media[];
        this.createComponentInstances(this.media, name, genre);
      })

  }

  createComponentInstances(media: Media[], genre: string, idGenre: number) {

    let cmp = this.viewContainerRef.createComponent(ListaMediaComponent);
    cmp.instance.results = media;
    cmp.instance.genre = genre;
    cmp.instance.genreId = idGenre;

    if (!this.generatedOnInit) {

      this.onLoadingComponent.emit();
      this.getOffsetDistance();

    }

    this.loadingResults = false;

  }

  getOffsetDistance() {

    let slider = document.querySelector("app-lista-media:last-of-type");
    let slideY = slider?.getBoundingClientRect().y;
    let slideHeight = slider?.getBoundingClientRect().height;
    let offset = 50;

    this.sliderDistanceTop = ((this.innerHeight + offset) - (slideY! + slideHeight!));

    if (this.sliderDistanceTop > 0) {
      this.checkGenres();
    }

  }

}
