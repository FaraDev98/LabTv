import { Component, Input } from '@angular/core';
import { Cast } from '../models/mediaDetail.new';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.css']
})
export class CastListComponent {

  @Input()
  Cast: Cast[] = [];

  getProfileImg(actor: Cast) {
    console.log(this.Cast);
    return `${environment.BASE_URL_POSTERS}/w300/${actor.profile_path}`

  }
}
