import {Component} from '@angular/core';
import {ContentService} from "../content.service";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../data-model/user";

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent {

  secret$: Observable<string>;
  username$: Observable<string>;
  permissions$: Observable<string[]>;

  constructor(private content: ContentService, private authService: AuthService) {
    this.secret$ = content.getSecret().pipe(map(response => response.content));
    this.username$ = authService.userSubject.pipe(map((user: User) => user.username));
    this.permissions$ = authService.userSubject.pipe(map(user => user.permissions));
  }

}
