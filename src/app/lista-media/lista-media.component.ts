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
  type: string = "movie";

  ngOnInit(): void {
    this.getTrends(this.type, this.trend)
  }

  results: Media[] = [];

  @Input()
  isTrendList: Boolean = false;

  @Output()
  selectedTrend = new EventEmitter<Media[]>

  getTrends(type: string, trend: string) {
    this.mediaService.getTrends(type, trend)
      .subscribe(res => {
        this.results = res.results;
        this.selectedTrend.emit(this.results);
      });
  }

  changeSelectedTrend() {
    this.getTrends(this.type, this.trend);
  }


}
