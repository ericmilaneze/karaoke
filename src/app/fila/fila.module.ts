import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilaComponent } from './fila.component';
import { FilaRoutingModule } from './fila-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FilaRoutingModule
  ],
  declarations: [FilaComponent]
})
export class FilaModule { }
