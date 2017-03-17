import { GerenciadorFilaService } from '../_services/gerenciador-fila.service';
import { Observable } from 'rxjs/Rx';
import { MusicasDBService } from '../_services/musicas-d-b.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss']
})
export class FilaComponent implements OnInit {

  musicas: any[];

  constructor(
    private musicasDB: MusicasDBService,
    private gerenciadorFila: GerenciadorFilaService) { }

  ngOnInit() {
    this.musicasDB.retornarMusicas()
      .subscribe(ms => this.musicas = this.gerenciadorFila.retornarFila(ms));
  }

}
