import { Component, Input } from '@angular/core';
import { Similar } from '../models/mediaDetail.new';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-similar-list',
  templateUrl: './similar-list.component.html',
  styleUrls: ['./similar-list.component.css']
})
export class SimilarListComponent {

  @Input()
  Similars: Similar[] = []


  getBackdropPath(similar: Similar) {

    return `${environment.BASE_URL_POSTERS}/w300/${similar?.backdrop_path}`

  }
}
