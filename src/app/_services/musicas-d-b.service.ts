import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserInfo } from 'firebase';

@Injectable()
export class MusicasDBService {

  constructor(private af: AngularFire) { }

  adicionarMusica(musica, user: UserInfo) {
    const musicas = this.af.database.list('/musicas');

    musica.user = JSON.parse(JSON.stringify(user));
    musica.added = true;
    musica.played = false;

    musicas.push(musica);
  }

  retornarMusicas() {
    return this.af.database.list('/musicas');
  }

  atualizarMusicas(musica) {
    return this.af.database.object('/musicas/' + musica.$key).update(musica);
  }
}
