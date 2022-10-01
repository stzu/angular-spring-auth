import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  secretsEnabled$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.secretsEnabled$ = authService.hasPermission('RETRIEVE_SECRETS');
  }

}
