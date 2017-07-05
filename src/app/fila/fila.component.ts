import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { GerenciadorFilaService } from '../_services/gerenciador-fila.service';
import { UsuarioService } from '../_services/usuario.service';
import { MusicasDBService } from '../_services/musicas-d-b.service';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss']
})
export class FilaComponent implements OnInit {

  musicas: any[];
  isUsuarioMaster: boolean;

  constructor(
    private af: AngularFire,
    private us: UsuarioService,
    private db: MusicasDBService,
    private gerenciadorFila: GerenciadorFilaService) { }

  ngOnInit() {
    this.gerenciadorFila.obterFila()
      .subscribe(ms => this.musicas = ms);

    this.af.auth
      .switchMap(authState => {
        if (!!authState && !!authState.auth) {
          return this.us.verificarSeUsuarioMaster(authState.auth)
            .map(isUsuarioMaster => {
              return isUsuarioMaster;
            });
        }

        return Observable.of(false);
      })
      .subscribe(isUsuarioMaster => this.isUsuarioMaster = isUsuarioMaster);
  }

  darPrioridade(musica) {
    this.db.darPrioridade(musica);
  }

  tirarPrioridade(musica) {
    this.db.tirarPrioridade(musica.prioridadeId);
  }

  definirMusicaComoErrada(musica) {
    this.db.definirMusicaComErro(musica);
  }

  definirMusicaComoTocada(musica) {
    this.db.definirMusicaComoTocada(musica);
  }

}
