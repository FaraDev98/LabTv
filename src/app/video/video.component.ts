import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  sub: any;


  constructor(private mediaService: MediaService) { }

  @Input()
  trailerPath: string = "";

  @Output()
  onVideoClosing = new EventEmitter<Boolean>();


  closeVideoComponent() {
    this.onVideoClosing.emit(true);
  }
}