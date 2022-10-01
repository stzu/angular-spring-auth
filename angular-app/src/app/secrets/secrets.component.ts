import {Component, OnInit} from '@angular/core';
import {User} from "../user";

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit {

  secret: string;
  user: User;

  constructor() {
    this.secret = "Top secret.";
    this.user = new User('static', ['PERMISSION']);
  }

  ngOnInit(): void {
  }

}
