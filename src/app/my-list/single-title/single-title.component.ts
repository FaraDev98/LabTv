import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediaService } from 'src/app/media.service';
import { Media } from 'src/app/models/media-detail';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-title',
  templateUrl: './single-title.component.html',
  styleUrls: ['./single-title.component.css']
})
export class SingleTitleComponent {

  @Input()
  title?: Media;

  @Input()
  isWishlist: Boolean = false;

  @Output()
  onDeleted = new EventEmitter<number>()

  constructor(private mediaService: MediaService) { }

  getPosterPath() {
    return `${environment.BASE_URL_POSTERS}w300/${this.title?.poster_path}`
  }

  deleteFromList() {

    this.onDeleted.emit(this.title?.id);

  }
}
