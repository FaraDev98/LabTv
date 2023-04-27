import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-discover',
  templateUrl: './movies-discover.component.html',
  styleUrls: ['./movies-discover.component.css']
})
export class MoviesDiscoverComponent {

  isLoading: Boolean = true;

  // ngOnInit(): void {
  //   this.isLoading = true;
  // }

  subComponentLoaded() {
    console.log("event")
    setTimeout(() => {
      this.isLoading = false
    }, 500)
  }
}
