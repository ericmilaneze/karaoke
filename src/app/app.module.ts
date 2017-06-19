import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { YoutubePlayerModule } from './youtube-player/youtube-player.module';

import { GerenciadorFilaService } from './_services/gerenciador-fila.service';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { firebaseConfig } from './_settings/firebaseConfig';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing.module';
import { MenuComponent } from './menu/menu.component';
import { MusicasDBService } from './_services/musicas-d-b.service';
import { CanActivateSignedInGuard } from './_guards/can-activate-signed-in.guard';
import { UsuarioService } from './_services/usuario.service';
import { CanActivateMasterSignedInGuard } from './_guards/can-activate-master-signed-in.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RoutingModule
  ],
  providers: [
    AuthService,
    CanActivateSignedInGuard,
    CanActivateMasterSignedInGuard,
    MusicasDBService,
    GerenciadorFilaService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
