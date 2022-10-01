import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  title: string;
  username: string;

  constructor() {
    // TODO get username from auth service
    this.username = 'authservice.user.username';
    this.title = 'oauth-demo';
  }

  ngOnInit(): void {

  }

}
