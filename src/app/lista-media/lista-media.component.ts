import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Media } from '../models/media-detail';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-lista-media',
  templateUrl: './lista-media.component.html',
  styleUrls: ['./lista-media.component.css']
})
export class ListaMediaComponent implements OnInit {

  constructor(private mediaService: MediaService) { }

  trend: string = "day";

  @Input()
  results: Media[] = [];

  @Input()
  isTrendList: Boolean = false;

  @Input()
  genre: string = "";

  @Input()
  genreId: number = 0;

  @Output()
  selectedTrend = new EventEmitter<Media[]>()

  ngOnInit(): void {
    this.getTrends(this.trend)
  }

  getTrends(trend: string) {
    if (this.isTrendList) {
      this.mediaService.getTrends(trend)
        .subscribe(res => {
          this.results = res.results;
          this.selectedTrend.emit(this.results);
        });
    }
  }

  changeSelectedTrend() {
    this.getTrends(this.trend);
  }


}
