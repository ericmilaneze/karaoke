import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserInfo } from 'firebase';

@Injectable()
export class MusicasDBService {

  constructor(
    private af: AngularFire) { }

  adicionarMusica(musica, user: UserInfo) {
    const musicas = this.obterMusicas();

    musica.user = JSON.parse(JSON.stringify(user));
    musica.added = true;
    musica.played = false;

    musicas.push(musica);
  }

  obterMusicas() {
    return this.af.database.list('/musicas');
  }

  obterMusicasTocadas() {
    return this.af.database.list('/musicas-tocadas');
  }

  obterMusicasComErro() {
    return this.af.database.list('/musicas-erro');;
  }

  obterMusicasComPrioridade() {
    return this.af.database.list('/musicas-prioridade');
  }

  atualizarMusicas(musica) {
    return this.af.database.object('/musicas/' + musica.$key).update(musica);
  }

  definirMusicaComoTocada(musica) {
    const musicasTocadas = this.obterMusicasTocadas();

    return musicasTocadas.push(musica.$key);
  }

  definirMusicaComErro(musica) {
    const musicasComErro = this.obterMusicasComErro();

    return musicasComErro.push(musica.$key);
  }

  darPrioridade(musica) {
    const musicasComPrioridade = this.obterMusicasComPrioridade();

    return musicasComPrioridade.push(musica.$key);
  }

  tirarPrioridade(prioridadeId) {
    return this.obterMusicasComPrioridade().remove(prioridadeId);
  }
}
