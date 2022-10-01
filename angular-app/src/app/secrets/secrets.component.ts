import {Component, OnInit} from '@angular/core';
import {User} from "../data-model/user";
import {ContentService} from "../content.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit {

  secret: string;
  user: User;

  constructor(private content: ContentService, private auth: AuthService) {
    this.secret = "";
    this.user = new User('', []);
  }

  ngOnInit(): void {
    this.content.getSecret().subscribe(response => this.secret = response.content);
    this.auth.getCurrentUser().subscribe(response => this.user = response);
  }

}
