import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { Router } from '@angular/router';
import { AddedMedia, Media } from '../models/media-detail';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  isAuthenticated: Boolean = false;
  media: Media[] = [];
  addedResponse: AddedMedia[] = [];

  constructor(private mediaService: MediaService, private auth: AuthService, private router: Router, private util: UtilService) { }

  ngOnInit(): void {
    if (this.checkUserLogin()) {

      /* Per gestione utente: se token scaduto ricarico la rotta */
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      } //reuseStrategy

      this.isAuthenticated = true;
      this.getMyList();
    };
  }

  getMyList() {
    this.mediaService.getMyList()
      .subscribe({
        next: (data) => {
          for (let m of data) {
            this.media.push(m.media);
            this.addedResponse.push(m);
          }
        },
        error: (err) => {
          if (this.util.parseErrorStatus(err) == 401) {
            this.mediaService.disconnectUser();
            this.router.navigate(["myList"]);
          }
        }
      })
  }

  checkUserLogin() {
    if (this.auth.getLoggedUser()) {
      return true;
    }
    return false;
  }

  onDeletedElement(id: number) {

    let toDelete = this.addedResponse.find(added => added.media.id == id);
    if (toDelete) {
      this.mediaService.removeFromList(toDelete.id.toString())
        .subscribe(() => {
          this.media = [];
          this.getMyList();
        })
    }


  }

}
