import {Injectable} from '@angular/core';
import {concatAll, Observable, ReplaySubject} from "rxjs";
import {User} from "../data-model/user";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new ReplaySubject<User>(1);
  private http: HttpClient;

  constructor(private httpBackend: HttpBackend) {
    // custom HttpClient without interceptors need to retrieve access_token from OpenID Connect Provider (e.g. keycloak)
    this.http = new HttpClient(httpBackend);
  }

  initUser(): Observable<void> {

    return this.http.get<OauthInfo>("http://localhost:4200/redirect_uri?info=json").pipe(
      map(
        sessionInfo => {
          environment.access_token = sessionInfo.access_token;
          // this.usernameSubject.next(info.id_token.preferred_username);
          let httpOptions = {headers: {'Authorization': 'Bearer ' + sessionInfo.access_token}};
          return this.http.get<User>(environment.backend + '/users/' + sessionInfo.id_token.preferred_username, httpOptions)
            .pipe(map(user => this.userSubject.next(user)))
        }
      ), concatAll());
  }

  hasPermission(reqPermission: string): Observable<boolean> {

    return this.userSubject.pipe(map(
      user => user.permissions.some(permission => permission === reqPermission)
    ));
  }
}

interface OauthInfo {

  access_token: string,
  id_token: IdToken

}

interface IdToken {
  sub: string;
  given_name: string;
  preferred_username: string;
}
