import {Injectable} from '@angular/core';
import {concatAll, Observable, ReplaySubject} from "rxjs";
import {User} from "../data-model/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new ReplaySubject<User>(1);

  constructor(private http: HttpClient) {
  }

  initUser(): Observable<void> {

    return this.http.get<OauthInfo>("http://localhost:4200/redirect_uri?info=json").pipe(
      map(
        sessionInfo => {
          return this.http.get<User>(environment.backend + '/users/' + sessionInfo.id_token.preferred_username)
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
