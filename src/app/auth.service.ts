import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoggedUser, LoginDto, RegisterDto } from './models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: RegisterDto): Observable<LoggedUser> {
    // TODO: environments
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "register", user);
  }

  login(user: LoginDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "login", user);
  }

  setLoggedUser(user: LoggedUser) {
    /* Scrive loggedUser nel local storage */
    localStorage.setItem("user", JSON.stringify(user));
  }

  getLoggedUser(): LoggedUser | null {

    let userStorage = localStorage.getItem("user");

    if (userStorage != null) {
      let u: LoggedUser = JSON.parse(userStorage);
      return u;
    } else {
      return null;
    }
  }

}
