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
  play = false;
  player;
  state: number;
  musica;
  videoId: string;
  semMusicas = false;

  constructor(
    private musicasDB: MusicasDBService,
    private gerenciadorFila: GerenciadorFilaService) { }

  ngOnInit() {
    this.proximaMusica();
  }

  proximaMusica() {
    this.musicasDB.retornarMusicas()
      .subscribe(ms => {
        this.musica = this.gerenciadorFila.retornarProxima(ms);

        if (!this.musica) {
          this.semMusicas = true;
        }
        else {
          this.semMusicas = false;
          this.videoId = this.musica.id.videoId;

          let itvSub = Observable.interval(1000)
            .subscribe(t => {
              if (this.tempo > 0) {
                this.tempo--;
                this.play = false;
              }
              else {
                itvSub.unsubscribe();
                this.play = true;
              }
            });
        }
      });
  }

  savePlayer(event) {
    this.player = event;
    this.player.playVideo();
  }

  onStateChange(event) {
    this.state = event.data;

    if (this.state == 0) {
      this.musica.played = true;

      this.musicasDB.atualizarMusicas(this.musica);
      this.play = false;
      this.tempo = this.defaults.tempoInicial;
      this.proximaMusica();
    }
  }

}
