import {Component, OnInit} from '@angular/core';
import {ContentService} from "../content.service";
import {AuthService} from "../auth/auth.service";
import {AsyncSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Content} from "../data-model/content";
import {User} from "../data-model/user";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private usernameSubject = new AsyncSubject<string>();
  username$ = this.usernameSubject.asObservable();
  content$: Observable<string>;

  constructor(private contentService: ContentService, private authService: AuthService) {
    this.content$ = this.contentService.getContent().pipe(map((response: Content) => response.content));
    this.username$ = authService.user$.pipe(map((user: User) => user.username));
  }

  ngOnInit(): void {
  }

}
