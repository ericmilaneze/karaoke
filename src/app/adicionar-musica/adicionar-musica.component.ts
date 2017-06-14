import { MusicasDBService } from '../_services/musicas-d-b.service';
import { Component, OnInit } from '@angular/core';

import { YoutubeSearchService } from "app/adicionar-musica/youtube-search.service";
import { UserInfo } from "firebase";
import { AngularFire } from "angularfire2";

@Component({
  selector: 'app-adicionar-musica',
  templateUrl: './adicionar-musica.component.html',
  styleUrls: ['./adicionar-musica.component.scss'],
  providers: [YoutubeSearchService]
})
export class AdicionarMusicaComponent implements OnInit {

  private defaults = {
    youtubeURLPrefix: 'https://www.youtube.com/watch?v='
  }

  musicas: any[];
  busca: string;
  buscaAtual: string;
  nextToken: string;
  previousToken: string;
  user: UserInfo;
  players: any[];
  testando: any[];

  processResult = (res) => {
    let r = res.json();
    this.musicas = r.items;
    this.nextToken = r.nextPageToken;
    this.previousToken = r.prevPageToken;
  }

  constructor(
    private youtubeSearchService: YoutubeSearchService,
    private af: AngularFire,
    private musicasDB: MusicasDBService) { }

  ngOnInit() {
    this.testando = [];
    this.players = [];
    this.af.auth.subscribe(authState => this.user = authState.auth);
  }

  searchYoutube() {
    this.buscaAtual = this.busca;

    this.youtubeSearchService.search(this.buscaAtual)
      .subscribe(this.processResult);
  }

  nextPage() {
    this.youtubeSearchService.search(this.buscaAtual, this.nextToken)
      .subscribe(this.processResult);
  }

  previousPage() {
    this.youtubeSearchService.search(this.buscaAtual, this.previousToken)
      .subscribe(this.processResult);
  }

  adicionarMusica(musica) {
    this.testando[musica.id.videoId] = true;
    //this.musicasDB.adicionarMusica(musica, this.user);
  }

  savePlayer(event, musica) {
    this.players[musica.id.videoId] = event;
    this.players[musica.id.videoId].playVideo();
  }

  onStateChange(event, musica) {
    console.log(event.data);
    if (event.data !== 3 && event.data !== -1) {
      this.testando[musica.id.videoId] = false;
      this.musicasDB.adicionarMusica(musica, this.user);
    } else if (event.data === -1) {
      this.testando[musica.id.videoId] = false;
      musica.erro = true;
    }
  }

}
