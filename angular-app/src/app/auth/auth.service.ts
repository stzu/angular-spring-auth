import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../data-model/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersBase = environment.backend + '/users';

  constructor(private http: HttpClient) {
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.usersBase + '/current');
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.usersBase + '/' + username);
  }

  hasPermission(reqPermission: string): Observable<boolean> {

    return this.getCurrentUser().pipe(map(
      user => user.permissions.some(item => item === reqPermission)
    ));
  }

}
