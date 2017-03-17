import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../environments/environment';
import { LoginComponent } from 'app/login/login.component';
import { HomeComponent } from 'app/home/home.component';
import { CanActivateSignedIn } from './_guards/auth.guard';
import { FilaComponent } from "app/fila/fila.component";
import { CantarComponent } from "app/cantar/cantar.component";
import { AdicionarMusicaComponent } from './adicionar-musica/adicionar-musica.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'adicionar-musica', component: AdicionarMusicaComponent, canActivate: [CanActivateSignedIn] },
      { path: 'cantar', component: CantarComponent, canActivate: [CanActivateSignedIn] },
      { path: 'fila', component: FilaComponent, canActivate: [CanActivateSignedIn] },
      { path: 'home', component: HomeComponent, canActivate: [CanActivateSignedIn] },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/home' }
    ])
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
