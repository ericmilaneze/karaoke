import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FilaComponent } from './fila.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FilaComponent },
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class FilaRoutingModule { }
