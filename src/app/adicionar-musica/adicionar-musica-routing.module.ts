import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdicionarMusicaComponent } from './adicionar-musica.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AdicionarMusicaComponent }
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AdicionarMusicaRoutingModule { }
