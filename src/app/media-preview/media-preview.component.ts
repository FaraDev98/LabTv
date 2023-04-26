import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../models/media-detail';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-dettaglio-media',
  templateUrl: './media-preview.component.html',
  styleUrls: ['./media-preview.component.css']
})
export class MediaPreviewComponent implements OnInit {

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
    this.getPosterPath();

  }

  @Input()
  media?: Media

  posterPath: string = ""

  getPosterPath() {
    this.posterPath = `${this.mediaService.BASE_URL_POSTERS}w300/${this.media?.poster_path}`
  }

}
