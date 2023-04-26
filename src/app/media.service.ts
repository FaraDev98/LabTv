import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from './models/media-detail';
import { Observable } from 'rxjs';
import { GenreResponse } from './models/genres';


@Injectable({
  providedIn: 'root'
})
export class MediaService {

  BASE_URL_POSTERS: string = "https://image.tmdb.org/t/p/";

  constructor(private http: HttpClient) { }

  getTrends(type: string, trend: string): Observable<Response> {
    return this.http.get<Response>(`${environment.BASE_URL_API_MEDIA}3/trending/${type}/${trend}?api_key=${environment.API_KEY}`)
  }

  getGenres(type: string) {
    return this.http.get<GenreResponse>(`${environment.BASE_URL_API_MEDIA}3/genre/${type}/list?api_key=${environment.API_KEY}&language=it`)
  }

}

