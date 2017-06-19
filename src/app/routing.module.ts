import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../environments/environment';
import { LoginComponent } from 'app/login/login.component';
import { CanActivateSignedInGuard } from './_guards/can-activate-signed-in.guard';
import { CanActivateMasterSignedInGuard } from './_guards/can-activate-master-signed-in.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'adicionar-musica',
        loadChildren: './adicionar-musica/adicionar-musica.module#AdicionarMusicaModule',
        canActivate: [CanActivateSignedInGuard]
      },
      {
        path: 'cantar',
        loadChildren: './cantar/cantar.module#CantarModule',
        canActivate: [CanActivateMasterSignedInGuard]
      },
      {
        path: 'fila',
        loadChildren: './fila/fila.module#FilaModule',
        canActivate: [CanActivateSignedInGuard] },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
        canActivate: [CanActivateSignedInGuard]
      },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/home' }
    ])
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
