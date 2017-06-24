import { Injectable } from '@angular/core';

import { MusicasDBService } from './musicas-d-b.service';

@Injectable()
export class GerenciadorFilaService {

  constructor(private musicasDB: MusicasDBService) { }

  obterFila() {
    const obsMusicas = this.musicasDB.obterMusicas();
    const obsMusicasTocadas = this.musicasDB.obterMusicasTocadas();
    const obsMusicasComErro = this.musicasDB.obterMusicasComErro();

    return obsMusicas.switchMap(musicas =>
      obsMusicasTocadas.switchMap(idsMusicasTocadas => {
        return obsMusicasComErro.map(idsMusicasComErro => {
          for (const idMusicaTocada of idsMusicasTocadas) {
            const musicaTocada = musicas.find(m => m.$key === idMusicaTocada.$value);

            if (!!musicaTocada) {
              musicaTocada.tocada = true;
            }
          }

          for (const idMusicaComErro of idsMusicasComErro) {
            const musicaComErro = musicas.find(m => m.$key === idMusicaComErro.$value);

            if (!!musicaComErro) {
              musicaComErro.erro = true;
            }
          }

          return musicas.filter(m => !m.tocada && !m.erro);
        });
      }));
  }

  obterProxima() {
    return this.obterFila().map(musicas => {
      if (!!musicas && musicas.length > 0) {
        return musicas[0];
      }

      return null;
    });
  }

}
