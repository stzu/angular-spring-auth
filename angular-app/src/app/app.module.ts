import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {SecretsComponent} from './secrets/secrets.component';
import {HttpClientModule} from '@angular/common/http';
import {OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from "./auth/auth.config";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";
import {AuthService} from "./auth/auth.service";

function initAuth(oauthService: OAuthService, authService: AuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    oauthService.tokenValidationHandler = new JwksValidationHandler();
    return oauthService.loadDiscoveryDocumentAndLogin().then(res => {
        console.log("Login success: " + res);
        if (res) authService.initUser();
      }
    );
  }
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
    AppRoutingModule,
    OAuthModule.forRoot(
      {
        resourceServer: {
          allowedUrls: ['http://localhost:8080'],
          sendAccessToken: true
        }
      }
    )
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [OAuthService, AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
