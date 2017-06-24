import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { GerenciadorFilaService } from '../_services/gerenciador-fila.service';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss']
})
export class FilaComponent implements OnInit {

  musicas: any[];

  constructor(
    private gerenciadorFila: GerenciadorFilaService) { }

  ngOnInit() {
    this.gerenciadorFila.obterFila()
      .do(ms => console.log(ms))
      .subscribe(ms => this.musicas = ms);
  }

}
