import {Component} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  secretsEnabled$ = this.authService.hasPermission("RETRIEVE_SECRETS");

  constructor(public authService: AuthService) {
  }

}
