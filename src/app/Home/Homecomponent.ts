import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../models/media-detail';
import { MediaService } from '../media.service';
import { Genre, GenreResponse } from '../models/genres';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {


  title?: string = "";
  backdropPath?: string;
  genreStr: string = "";


  constructor(private mediaService: MediaService) { }

  getSelectedTrendOnChange(trendSelected: Media[]) {
    if (trendSelected) {
      // ! in questa API il titolo dei film è la variabile title, mentre quello delle serie tv è name 
      if (trendSelected[0].media_type == "movie") {
        this.title = trendSelected[0].title;
      } else {
        this.title = trendSelected[0].name;
      }

      console.log(trendSelected[0]);
      this.getBackdropPath(trendSelected[0].backdrop_path);
      this.getGenresList(trendSelected[0])
    }

  }

  getBackdropPath(path: string) {

    if (window.innerWidth < 680 && window.ScreenOrientation != undefined) {
      this.backdropPath = "https://image.tmdb.org/t/p/w500" + path;
    } else {
      this.backdropPath = "https://image.tmdb.org/t/p/original" + path;
    }
  }

  getGenresList(media: Media) {
    this.mediaService.getGenres(media.media_type)
      .subscribe(res => {
        this.getMediaGenresByIds(media, res.genres);
      });
  }

  getMediaGenresByIds(media: Media, Genres: Genre[]) {

    this.genreStr = "";

    for (let g of media.genre_ids) {
      for (let gen of Genres) {
        if (g == gen.id) {
          if (this.genreStr == "") {
            this.genreStr += gen.name;
          } else {
            this.genreStr += " - " + gen.name;
          } //EndIf
        } //EndIf
      } //EndFor
    } //EndFor
  } // getMediaGenresByIds

}

// https://image.tmdb.org/t/p/original

// https://image.tmdb.org/t/p/w1920_and_h800_multi_faces
