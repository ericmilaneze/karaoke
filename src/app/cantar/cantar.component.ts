import { GerenciadorFilaService } from '../_services/gerenciador-fila.service';
import { Observable } from 'rxjs/Rx';
import { MusicasDBService } from '../_services/musicas-d-b.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cantar',
  templateUrl: './cantar.component.html',
  styleUrls: ['./cantar.component.scss']
})
export class CantarComponent implements OnInit {

  private defaults = {
    tempoInicial: 10
  }

  tempo = this.defaults.tempoInicial;
  tocandoMusica: boolean;
  carregandoMusica: boolean;
  mostrandoErro: boolean;
  player;
  state: number;
  musica: any;
  videoId: string;

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
}
