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
    const obsMusicaAtual = this.musicasDB.obterMusicaAtual();

    return obsMusicas.switchMap(musicas =>
      obsMusicasTocadas.switchMap(idsMusicasTocadas => {
        return obsMusicasComErro.switchMap(idsMusicasComErro => {
          return obsMusicasComPrioridade.switchMap(idsMusicasComPrioridade => {
            return obsMusicaAtual.map(idMusicaAtual => {
              const musicasTocadas = [];

              // limpando todas músicas
              for (const musica of musicas) {
                musica.tocada = false;
                musica.erro = false;
                musica.prioridade = false;
                musica.prioridadeId = null;
                musica.atual = false;
                musica.primeiraVez = false;
              }

              // músicas tocadas
              for (const idMusicaTocada of idsMusicasTocadas) {
                const musicaTocada = musicas.find(m => m.$key === idMusicaTocada.$value);

                if (!!musicaTocada) {
                  musicaTocada.tocada = true;

                  musicasTocadas.push(musicaTocada);
                }
              }

              // músicas com erro
              for (const idMusicaComErro of idsMusicasComErro) {
                const musicaComErro = musicas.find(m => m.$key === idMusicaComErro.$value);

                if (!!musicaComErro) {
                  musicaComErro.erro = true;
                }
              }

              // música atual
              const musicaAtual = musicas.find(m => m.$key === idMusicaAtual && !m.erro && !m.tocada);

              if (!!musicaAtual) {
                musicaAtual.atual = true;
              }

              // músicas com prioridade
              const musicasComPrioridade = [];

              for (const idMusicaComPrioridade of idsMusicasComPrioridade) {
                const musicaComPrioridade = musicas.find(m => m.$key === idMusicaComPrioridade.$value);

                if (
                  !!musicaComPrioridade &&
                  !musicaComPrioridade.erro &&
                  !musicaComPrioridade.tocada &&
                  !musicaComPrioridade.atual) {

                  musicaComPrioridade.prioridade = true;
                  musicaComPrioridade.prioridadeId = idMusicaComPrioridade.$key;

                  // dessa forma, mantenho a ordem em que as músicas são colocadas como prioridade
                  musicasComPrioridade.push(musicaComPrioridade);
                }
              }

              // fila que será retornada
              const fila = [];

              // adicionando a música atual como primeira da fila
              if (!!musicaAtual) {
                fila.push(musicaAtual);
              }

              // adicionando as músicas com prioridade na fila
              for (const musicaComPrioridade of musicasComPrioridade) {
                fila.push(musicaComPrioridade);
              }

              // pegar músicas de usuários que ainda não cantaram
              for (
                const proximaMusica of
                  musicas.filter(m =>
                    !m.tocada &&
                    !m.erro &&
                    !m.prioridade &&
                    !m.atual)) {

                if (
                  musicasTocadas.findIndex(mt => mt.user.uid === proximaMusica.user.uid) === -1 &&
                  fila.findIndex(mf => mf.user.uid === proximaMusica.user.uid) === -1) {

                  proximaMusica.primeiraVez = true;

                  fila.push(proximaMusica);
                }
              }

              const musicasRestantes = musicas.filter(m =>
                !m.tocada &&
                !m.erro &&
                !m.prioridade &&
                !m.atual &&
                !m.primeiraVez);

              // adicionando o que restou (não é prioridade, nem atual)
              for (const mr of musicasRestantes) {
                fila.push(mr);
              }

              return fila;
            });
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
