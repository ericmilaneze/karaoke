import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { YoutubePlayerModule } from 'ng2-youtube-player/src/index';

import { GerenciadorFilaService } from './_services/gerenciador-fila.service';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { firebaseConfig } from './_settings/firebaseConfig';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CanActivateSignedIn } from './_guards/auth.guard';
import { RoutingModule } from './routing.module';
import { MenuComponent } from './menu/menu.component';
import { FilaComponent } from './fila/fila.component';
import { CantarComponent } from './cantar/cantar.component';
import { AdicionarMusicaComponent } from './adicionar-musica/adicionar-musica.component';
import { MusicasDBService } from "app/_services/musicas-d-b.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    FilaComponent,
    CantarComponent,
    AdicionarMusicaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RoutingModule,
    YoutubePlayerModule
  ],
  providers: [
    AuthService,
    CanActivateSignedIn,
    MusicasDBService,
    GerenciadorFilaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
