import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdicionarMusicaRoutingModule } from './adicionar-musica-routing.module';
import { AdicionarMusicaComponent } from './adicionar-musica.component';
import { YoutubeSearchService } from './youtube-search.service';
import { YoutubePlayerModule } from '../youtube-player/youtube-player.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    YoutubePlayerModule,
    AdicionarMusicaRoutingModule
  ],
  providers: [YoutubeSearchService],
  declarations: [AdicionarMusicaComponent]
})
export class AdicionarMusicaModule { }
