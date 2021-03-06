import { Observable, Subscriber } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { MusicasDBService } from '../_services/musicas-d-b.service';
import { GerenciadorFilaService } from '../_services/gerenciador-fila.service';

@Component({
  selector: 'app-cantar',
  templateUrl: './cantar.component.html',
  styleUrls: ['./cantar.component.scss']
})
export class CantarComponent implements OnInit, OnDestroy {

  @ViewChild('divContainer')
  divContainer: ElementRef;

  private defaults = {
    tempoInicial: 10,
    tempoParaDecidirErro: 5,
    ratioLargura: 16,
    ratioAltura: 9,
    alturaMenuMargin: 75,
    offsetAlturaVideo: 25
  };

  tempo = this.defaults.tempoInicial;
  tocandoMusica: boolean;
  carregandoMusica: boolean;
  mostrandoErro: boolean;
  player;
  state: number;
  musica: any;
  videoId: string;
  larguraVideo: number;
  alturaVideo: number;
  itvSub: Subscription;
  filaSub: Subscription;
  erroItvSub: Subscription;

  constructor(
    private musicasDB: MusicasDBService,
    private gerenciadorFila: GerenciadorFilaService) { }

  ngOnInit() {
    this.resize();

    this.filaSub = this.gerenciadorFila.obterProxima()
      .subscribe(ms => {
        if (!this.musica || (!!this.musica && !!ms && this.musica.$key !== ms.$key)) {
          if (!!this.itvSub) {
            this.itvSub.unsubscribe();
          }

          if (!!this.erroItvSub) {
            this.erroItvSub.unsubscribe();
          }

          this.musica = ms;

          if (!!this.musica) {
            this.musicasDB.definirMusicaAtual(this.musica.$key);

            this.tempo = this.defaults.tempoInicial;
            this.carregandoMusica = true;
            this.videoId = this.musica.id.videoId;

            this.tocandoMusica = false;

            this.itvSub = Observable.interval(1000)
              .subscribe(t => {
                if (this.tempo > 0) {
                  this.tempo--;
                } else {
                  this.tocandoMusica = true;
                  this.carregandoMusica = false;

                  if (!!this.itvSub) {
                    this.itvSub.unsubscribe();
                  }
                }
              });
          }
        } else if (!ms) {
          this.musica = null;
          this.tocandoMusica = false;
          this.carregandoMusica = false;
          this.mostrandoErro = false;
        }
    });
  }

  ngOnDestroy() {
    if (!!this.filaSub) {
      this.filaSub.unsubscribe();
    }

    if (!!this.itvSub) {
      this.itvSub.unsubscribe();
    }

    if (!!this.erroItvSub) {
      this.erroItvSub.unsubscribe();
    }
  }

  onStateChange(event) {
    this.state = event.data;

    if (this.state === 0) { // música terminada
      this.tocandoMusica = false;
      this.musicasDB.definirMusicaComoTocada(this.musica);
    } else if (this.state === -1) { // música com erro
      if (!!this.itvSub) {
        this.itvSub.unsubscribe();
      }

      if (!!this.erroItvSub) {
        this.erroItvSub.unsubscribe();
      }

      this.tempo = this.defaults.tempoParaDecidirErro;

      this.erroItvSub = Observable.interval(1000)
        .subscribe(t => {
          if (this.tempo > 0) {
            this.tempo--;
          } else {
            if (this.state === -1) { // erro persiste
              this.mostrandoErro = true;
              this.tocandoMusica = false;
              this.tempo = this.defaults.tempoInicial;

              this.itvSub = Observable.interval(1000)
                .subscribe(t => {
                  if (this.tempo > 0) {
                    this.tempo--;
                  } else {
                    this.mostrandoErro = false;
                    this.musicasDB.definirMusicaComErro(this.musica);

                    if (!!this.itvSub) {
                      this.itvSub.unsubscribe();
                    }
                  }
                });
            }

            if (!!this.erroItvSub) {
              this.erroItvSub.unsubscribe();
            }
          }
        });
    }
  }

  savePlayer(event) {
    this.player = event;
    this.player.playVideo();
  }

  resize() {
    const alturaTela = window.innerHeight;
    const largura = +(window
      .getComputedStyle(this.divContainer.nativeElement, null)
      .getPropertyValue('width').replace('px', ''));
    const paddingLeft = (+window
      .getComputedStyle(this.divContainer.nativeElement, null)
      .getPropertyValue('padding-left').replace('px', ''));
    const paddingRight = (+window
      .getComputedStyle(this.divContainer.nativeElement, null)
      .getPropertyValue('padding-right').replace('px', ''));

    this.larguraVideo = (largura - paddingLeft - paddingRight);
    this.alturaVideo = this.larguraVideo * this.defaults.ratioAltura / this.defaults.ratioLargura;

    if (this.alturaVideo > alturaTela - this.defaults.alturaMenuMargin) {
      this.alturaVideo = alturaTela - this.defaults.alturaMenuMargin - this.defaults.offsetAlturaVideo;
      this.larguraVideo = this.alturaVideo * this.defaults.ratioLargura / this.defaults.ratioAltura;
    }
  }
}
