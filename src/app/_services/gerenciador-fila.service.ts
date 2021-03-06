import { Injectable } from '@angular/core';

import { MusicasDBService } from './musicas-d-b.service';
import { Musica } from '../_models/musica';
import { FBItem } from '../_models/fb-item';

@Injectable()
export class GerenciadorFilaService {

  constructor(private musicasDB: MusicasDBService) { }

  obterFila() {
    const obsMusicas = this.musicasDB.obterMusicas();
    const obsMusicasTocadas = this.musicasDB.obterMusicasTocadas();
    const obsMusicasComErro = this.musicasDB.obterMusicasComErro();
    const obsMusicasComPrioridade = this.musicasDB.obterMusicasComPrioridade();
    const obsMusicaAtual = this.musicasDB.obterMusicaAtual();

    return obsMusicas.switchMap((musicas: Musica[]) =>
      obsMusicasTocadas.switchMap((idsMusicasTocadas: FBItem[]) => {
        return obsMusicasComErro.switchMap((idsMusicasComErro: FBItem[]) => {
          return obsMusicasComPrioridade.switchMap((idsMusicasComPrioridade: FBItem[]) => {
            return obsMusicaAtual.map((idMusicaAtual: string) => {
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
              const musicasTocadas: Musica[] = [];

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

              // músicas tocadas + fila
              const musTocadasMaisFila: Musica[] = [];

              for (const mt of musicasTocadas) {
                musTocadasMaisFila.push(mt);
              }

              for (const mf of fila) {
                musTocadasMaisFila.push(mf);
              }

              const musTocadasMaisFilaInvertida = musTocadasMaisFila.reverse();

              // pegando o que restou (não é prioridade, nem primeira vez, nem atual)
              const musicasRestantes = musicas.filter(m =>
                !m.tocada &&
                !m.erro &&
                !m.prioridade &&
                !m.atual &&
                !m.primeiraVez);

              if (musicasRestantes.length > 0) {
                const musRestantesComIndice: { ix: number, m: Musica }[] = [];

                for (const mr of musicasRestantes) {
                  const i = musTocadasMaisFilaInvertida.findIndex(mtmfi => mtmfi.user.uid === mr.user.uid);

                  musRestantesComIndice.push({ ix: i, m: mr });
                }

                // ordem das músicas conforme a ordem de cantores (repetindo os cantores ainda)
                musRestantesComIndice.sort((a, b) => a.ix - b.ix).reverse();

                const caixas: Musica[][] = [];
                let uidCantorAtual = '';
                let ixCaixaAtual = 0;
                let caixaAtual: Musica[] = [];

                for (const mr of musRestantesComIndice) {
                  if (uidCantorAtual !== mr.m.user.uid) {
                    ixCaixaAtual = 0;
                    uidCantorAtual = mr.m.user.uid;
                  }

                  caixaAtual = caixas[ixCaixaAtual];

                  if (!caixaAtual) {
                    caixaAtual = [];
                    caixas.push(caixaAtual);
                  }

                  caixaAtual.push(mr.m);
                  ixCaixaAtual++;
                }

                for (const caixa of caixas) {
                  for (const musica of caixa) {
                    fila.push(musica);
                  }
                }
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
