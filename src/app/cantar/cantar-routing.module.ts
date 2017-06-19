import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CantarComponent } from './cantar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CantarComponent },
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class CantarRoutingModule { }
