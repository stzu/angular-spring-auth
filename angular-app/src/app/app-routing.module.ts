import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {SecretsComponent} from "./secrets/secrets.component";
import {SecretsGuard} from "./secrets/secrets.guard";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'secrets', component: SecretsComponent, canActivate: [SecretsGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
