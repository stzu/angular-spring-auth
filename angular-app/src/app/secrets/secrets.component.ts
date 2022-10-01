import {Component, OnInit} from '@angular/core';
import {User} from "../data-model/user";
import {ContentService} from "../content.service";
import {AuthService} from "../auth/auth.service";
import {AsyncSubject, Observable} from "rxjs";

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit {

  private secretSubject = new AsyncSubject<string>();
  secret$ = this.secretSubject.asObservable();
  user$: Observable<User>;

  constructor(private content: ContentService, private auth: AuthService) {
    this.user$ = auth.user$;
  }

  ngOnInit(): void {
    this.content.getSecret().subscribe(response => this.secretSubject.next(response.content));
  }

}
