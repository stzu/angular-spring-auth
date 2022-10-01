import {Injectable} from '@angular/core';
import {AsyncSubject, Observable} from "rxjs";
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

  private userSubject = new AsyncSubject<User>();
  user$ = this.userSubject.asObservable();
  private permissionsSubject = new AsyncSubject<string[]>();
  permissions$ = this.permissionsSubject.asObservable();

  constructor(private http: HttpClient, private oauthService: OAuthService) {
  }

  initUser() {
    let claims = this.oauthService.getIdentityClaims() as JWT;
    this.getUser(claims.preferred_username).subscribe(user => {
      this.userSubject.next(user);
      this.permissionsSubject.next(user.permissions)
    })
  }


  getUser(username: string): Observable<User> {

    return this.http.get<User>(this.usersBase + '/' + username);
  }

  hasPermission(reqPermission: string): Observable<boolean> {

    return this.permissions$.pipe(map(
      permissions => permissions.some(permission => permission === reqPermission)
    ));
  }
}

interface JWT {
  sub: string;
  given_name: string;
  preferred_username: string;
}
