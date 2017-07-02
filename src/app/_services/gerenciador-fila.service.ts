import { Injectable } from '@angular/core';

import { MusicasDBService } from './musicas-d-b.service';

@Injectable()
export class GerenciadorFilaService {

  constructor(private musicasDB: MusicasDBService) { }

  obterFila() {
    const obsMusicas = this.musicasDB.obterMusicas();
    const obsMusicasTocadas = this.musicasDB.obterMusicasTocadas();
    const obsMusicasComErro = this.musicasDB.obterMusicasComErro();
    const obsMusicasComPrioridade = this.musicasDB.obterMusicasComPrioridade();

    return obsMusicas.switchMap(musicas =>
      obsMusicasTocadas.switchMap(idsMusicasTocadas => {
        return obsMusicasComErro.switchMap(idsMusicasComErro => {
          return obsMusicasComPrioridade.map(idsMusicasComPrioridade => {
            // limpando todas músicas
            for (const musica of musicas) {
              musica.tocada = false;
              musica.erro = false;
              musica.prioridade = false;
              musica.prioridadeId = null;
            }

            // músicas tocadas
            for (const idMusicaTocada of idsMusicasTocadas) {
              const musicaTocada = musicas.find(m => m.$key === idMusicaTocada.$value);

              if (!!musicaTocada) {
                musicaTocada.tocada = true;
              }
            }

            // músicas com erro
            for (const idMusicaComErro of idsMusicasComErro) {
              const musicaComErro = musicas.find(m => m.$key === idMusicaComErro.$value);

              if (!!musicaComErro) {
                musicaComErro.erro = true;
              }
            }

            // músicas com prioridade
            const musicasComPrioridade = [];

            for (const idMusicaComPrioridade of idsMusicasComPrioridade) {
              const musicaComPrioridade = musicas.find(m => m.$key === idMusicaComPrioridade.$value);

              if (!!musicaComPrioridade && !musicaComPrioridade.erro && !musicaComPrioridade.tocada) {
                musicaComPrioridade.prioridade = true;
                musicaComPrioridade.prioridadeId = idMusicaComPrioridade.$key;

                // dessa forma, mantenho a ordem em que as músicas são colocadas como prioridade
                musicasComPrioridade.push(musicaComPrioridade);
              }
            }

            // músicas que ainda serão reproduzidas na fila (sem ordem)
            const proximasMusicas = musicas.filter(m => !m.tocada && !m.erro);

            // fila que será retornada
            const fila = [];

            // adicionando as músicas com prioridade na fila
            for (const musicaComPrioridade of musicasComPrioridade) {
              fila.push(musicaComPrioridade);
            }

            // adicionando o que restou (não é prioridade)
            for (const proximaMusica of proximasMusicas.filter(pm => !pm.prioridade)) {
              fila.push(proximaMusica);
            }

            return fila;
          });
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
