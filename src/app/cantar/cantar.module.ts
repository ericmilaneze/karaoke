import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CantarRoutingModule } from './cantar-routing.module';
import { CantarComponent } from './cantar.component';
import { YoutubePlayerModule } from '../youtube-player/youtube-player.module';

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule,
    CantarRoutingModule
  ],
  declarations: [CantarComponent]
})
export class CantarModule { }
