import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HubComponent } from './hub/hub.component';
import { TwitchComponent } from './hub/twitch/twitch.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HubComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: AuthComponent },
  { path: 'twitch', component: TwitchComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0, 0],
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
