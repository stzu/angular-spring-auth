import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {SecretsComponent} from "./secrets/secrets.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'secrets', component: SecretsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
