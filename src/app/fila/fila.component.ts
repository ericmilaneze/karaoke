import { Observable } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

import { GerenciadorFilaService } from '../_services/gerenciador-fila.service';
import { UsuarioService } from '../_services/usuario.service';
import { MusicasDBService } from '../_services/musicas-d-b.service';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss']
})
export class FilaComponent implements OnInit, OnDestroy {

  musicas: any[];
  isUsuarioMaster: boolean;
  filaSub: Subscription;

  constructor(
    private af: AngularFire,
    private us: UsuarioService,
    private db: MusicasDBService,
    private gerenciadorFila: GerenciadorFilaService) { }

  ngOnInit() {
    this.gerenciadorFila.obterFila()
      .subscribe(ms => this.musicas = ms);

    this.filaSub = this.af.auth
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

  ngOnDestroy() {
    if (!!this.filaSub) {
      this.filaSub.unsubscribe();
    }
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
