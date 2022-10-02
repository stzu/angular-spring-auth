import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {User} from "../data-model/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersBase = environment.backend + '/users';

  userSubject = new ReplaySubject<User>(1);

  constructor(private http: HttpClient, private oauthService: OAuthService) {
  }

  initUser() {
    let claims = this.oauthService.getIdentityClaims() as JWT;
    this.getUser(claims.preferred_username).subscribe(user => {
      this.userSubject.next(user);
    })
  }

  getUser(username: string): Observable<User> {

    return this.http.get<User>(this.usersBase + '/' + username);
  }

  hasPermission(reqPermission: string): Observable<boolean> {

    return this.userSubject.pipe(map(
      user => user.permissions.some(permission => permission === reqPermission)
    ));
  }
}

interface JWT {
  sub: string;
  given_name: string;
  preferred_username: string;
}
