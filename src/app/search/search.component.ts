import { Component } from '@angular/core';
import { MediaService } from '../media.service';
import { Media } from '../models/media-detail';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchTerm: string = "";
  searchResults: Media[] = [];
  constructor(private mediaService: MediaService) { }

  getResultsBySearch() {
    this.mediaService.getResultsBySearch(this.searchTerm)
      .subscribe(res => {
        this.searchResults = res.results as Media[];
        console.log(this.searchResults);
      })
  }

  getPosterPath(r: Media) {
    return `https://www.themoviedb.org/t/p/w130_and_h195_bestv2/${r.poster_path}`
  }

}
