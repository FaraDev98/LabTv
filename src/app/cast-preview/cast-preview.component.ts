import { Component, Input } from '@angular/core';
import { Cast } from '../models/mediaDetail.new';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cast-preview',
  templateUrl: './cast-preview.component.html',
  styleUrls: ['./cast-preview.component.css']
})
export class CastPreviewComponent {


  @Input()
  Actor?: Cast;

  getProfileImg() {

    if (this.Actor?.profile_path) {
      return `${environment.BASE_URL_POSTERS}/w120_and_h133_face/${this.Actor?.profile_path}`
    } else if (this.Actor?.gender === 1) {
      return "../../assets/img/woman.jpg"
    } else {
      return "../../assets/img/man.jpg"
    }



  }

}
