import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilaComponent } from './fila.component';
import { FilaRoutingModule } from './fila-routing.module';
import { MusicasDBService } from '../_services/musicas-d-b.service';

@NgModule({
  imports: [
    CommonModule,
    FilaRoutingModule
  ],
  declarations: [FilaComponent],
  providers: [MusicasDBService]
})
export class FilaModule { }
