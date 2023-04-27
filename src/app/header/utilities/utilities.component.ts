import { Component } from '@angular/core';
import { MediaService } from 'src/app/media.service';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent {

  searchTerm: string = "";

  constructor(private mediaService: MediaService) { }



}
