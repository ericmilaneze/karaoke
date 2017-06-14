import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MusicasDBService } from '../_services/musicas-d-b.service';
import { GerenciadorFilaService } from '../_services/gerenciador-fila.service';

@Component({
  selector: 'app-cantar',
  templateUrl: './cantar.component.html',
  styleUrls: ['./cantar.component.scss']
})
export class CantarComponent implements OnInit {

  @ViewChild('divContainer')
  divContainer: ElementRef;

  private defaults = {
    tempoInicial: 10,
    ratioLargura: 16,
    ratioAltura: 9,
    alturaMenuMargin: 75,
    offsetAlturaVideo: 25
  }

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

  get musicaTerminada() {
    return this.state === 0;
  }

  get musicaComErro() {
    return this.state === -1;
  }

  constructor(
    private musicasDB: MusicasDBService,
    private gerenciadorFila: GerenciadorFilaService) { }

  ngOnInit() {
    this.resize();

    this.musicasDB.retornarMusicas()
      .subscribe(ms => {
        if (!this.carregandoMusica && !this.mostrandoErro && !this.tocandoMusica) {
          this.musica = this.gerenciadorFila.retornarProxima(ms);

          if (this.musica) {
            this.tempo = this.defaults.tempoInicial;
            this.carregandoMusica = true;
            this.videoId = this.musica.id.videoId;

            this.tocandoMusica = false;

            const itvSub = Observable.interval(1000)
              .subscribe(t => {
                if (this.tempo > 0) {
                  this.tempo--;
                }
                else {
                  itvSub.unsubscribe();
                  this.tocandoMusica = true;
                  this.carregandoMusica = false;
                }
              });
          }
        }
      });
  }

  onStateChange(event) {
    this.state = event.data;

    if (this.musicaTerminada) {
      this.musica.played = true;
      this.musica.erro = false;
      this.tocandoMusica = false;
      this.musicasDB.atualizarMusicas(this.musica);
    } else if (this.musicaComErro) {
      this.mostrandoErro = true;
      this.tocandoMusica = false;
      this.tempo = this.defaults.tempoInicial;

      const itvSub = Observable.interval(1000)
        .subscribe(t => {
          if (this.tempo > 0) {
            this.tempo--;
          }
          else {
            itvSub.unsubscribe();
            this.musica.played = true;
            this.musica.erro = true;
            this.mostrandoErro = false;
            this.musicasDB.atualizarMusicas(this.musica);
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
    const largura = +(window.getComputedStyle(this.divContainer.nativeElement, null).getPropertyValue('width').replace('px', ''));
    const paddingLeft = +window.getComputedStyle(this.divContainer.nativeElement, null).getPropertyValue('padding-left').replace('px', '');
    const paddingRight = +window.getComputedStyle(this.divContainer.nativeElement, null).getPropertyValue('padding-right').replace('px', '');

    this.larguraVideo = (largura - paddingLeft - paddingRight);
    this.alturaVideo = this.larguraVideo * this.defaults.ratioAltura / this.defaults.ratioLargura;
    
    if (this.alturaVideo > alturaTela - this.defaults.alturaMenuMargin) {
      this.alturaVideo = alturaTela - this.defaults.alturaMenuMargin - this.defaults.offsetAlturaVideo;
      this.larguraVideo = this.alturaVideo * this.defaults.ratioLargura / this.defaults.ratioAltura;
    }
  }
}
