import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Media } from '../models/media-detail';
import { MediaService } from '../media.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-media-preview',
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
    return `${environment.BASE_URL_POSTERS}w300/${this.media?.poster_path}`
  }

  sendDataToService() {
    this.mediaService.movieToAdd = this.media;
  }

}



