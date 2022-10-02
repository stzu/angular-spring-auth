import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {SecretsComponent} from './secrets/secrets.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from "./auth/auth.service";
import {Observable} from "rxjs";
import {AuthorizationInterceptor} from "./auth/auth.interceptor";

function initAuth(authService: AuthService): () => Observable<void> {
  return () => authService.initUser();
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SecretsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
