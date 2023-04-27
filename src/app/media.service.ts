import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddedMedia, AddedMediaDto, Discover, Media, Response } from './models/media-detail';
import { Observable, catchError, of, throwError } from 'rxjs';
import { GenreResponse } from './models/genres';
import { MediaDetail } from './models/mediaDetail.new';
import { AuthService } from './auth.service';
import { Search } from './models/search';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MediaService {


  movieToAdd?: Media;

  BASE_URL_POSTERS: string = "https://image.tmdb.org/t/p/";

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  getTrends(trend: string): Observable<Response> {
    return this.http.get<Response>(`${environment.BASE_URL_API_MEDIA}3/trending/movie/${trend}?api_key=${environment.API_KEY}&language=${environment.LANGUAGE_API}`)
  }

  getGenres() {
    return this.http.get<GenreResponse>(`${environment.BASE_URL_API_MEDIA}3/genre/movie/list?api_key=${environment.API_KEY}&${environment.API_KEY}&language=${environment.LANGUAGE_API}`)
  }

  getMediaDetail(id: string): Observable<MediaDetail> {
    return this.http.get<MediaDetail>(`${environment.BASE_URL_API_MEDIA}3/movie/${id}?api_key=${environment.API_KEY}&append_to_response=videos,credits,similar&language=${environment.LANGUAGE_API}`)
  }

  getDiscoverListByGenres(genre: number, page: number): Observable<Discover> {
    return this.http.get<Discover>(`${environment.BASE_URL_API_MEDIA}3/discover/movie?api_key=${environment.API_KEY}&include_adult=false&include_video=false&page=${page}&sort_by=popularity.desc&with_genres=${genre}&language=${environment.LANGUAGE_API}`)
  }

  getResultsBySearch(searchTerm: string): Observable<Search> {
    return this.http.get<Search>(`${environment.BASE_URL_API_MEDIA}3/search/movie?api_key=${environment.API_KEY}&language=${environment.LANGUAGE_API}&query=${encodeURI(searchTerm)}&page=1&include_adult=false`)
  }



  addToList() {
    let LoggedUser = this.auth.getLoggedUser();
    let movieAdded;
    if (LoggedUser) {

      if (this.movieToAdd) {
        movieAdded = new AddedMediaDto(this.movieToAdd, LoggedUser.user.id)
        console.log(movieAdded);
      }


      return this.http.post<AddedMedia>(environment.USER_API_BASE_URL + "myList", movieAdded, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + LoggedUser.accessToken
        })
      })
    } else {
      this.router.navigate(["forms", "login"]);
    }
    return of();
  }

  removeFromList(id: string) {
    let LoggedUser = this.auth.getLoggedUser();
    return this.http.delete(environment.USER_API_BASE_URL + "myList/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + LoggedUser?.accessToken
      })
    })

  }

  getMyList(): Observable<AddedMedia[]> {

    let LoggedUser = this.auth.getLoggedUser();

    if (LoggedUser) {
      return this.http.get<AddedMedia[]>(environment.USER_API_BASE_URL + "myList?userId=" + LoggedUser?.user.id, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + LoggedUser?.accessToken
        })
      }).pipe(catchError(this.handleError))

    } else {
      return of([]);
    }

  }

  disconnectUser() {
    localStorage.clear();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    errorMessage = `${error.status}`

    return throwError(() => new Error(errorMessage));
  }

}
