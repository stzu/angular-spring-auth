import {Component, OnInit} from '@angular/core';
import {ContentService} from "../content.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  username: string | undefined;
  content: string | undefined;

  constructor(private contentService: ContentService, private authService: AuthService) {
  }

  ngOnInit(): void {

    this.contentService.getContent().subscribe(response => this.content = response.content);
    this.authService.getCurrentUser().subscribe(user => this.username = user.username);
  }

}
