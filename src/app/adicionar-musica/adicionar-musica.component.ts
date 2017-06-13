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

  musicas: any[];
  busca: string;
  buscaAtual: string;
  nextToken: string;
  previousToken: string;
  user: UserInfo;

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
    this.musicasDB.adicionarMusica(musica, this.user);
  }

}
