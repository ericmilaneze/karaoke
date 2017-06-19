import { MusicasDBService } from '../_services/musicas-d-b.service';
import { Component, OnInit } from '@angular/core';

import { UserInfo } from 'firebase';
import { AngularFire } from 'angularfire2';
import { YoutubeSearchService } from './youtube-search.service';

@Component({
  selector: 'app-adicionar-musica',
  templateUrl: './adicionar-musica.component.html',
  styleUrls: ['./adicionar-musica.component.scss']
})
export class AdicionarMusicaComponent implements OnInit {

  private defaults = {
    youtubeURLPrefix: 'https://www.youtube.com/watch?v=',
    tempoEsperaMobile: 6000
  };

  musicas: any[];
  busca: string;
  buscaAtual: string;
  nextToken: string;
  previousToken: string;
  user: UserInfo;
  players: any[];
  testando: any[];

  private processResult = (res) => {
    const r = res.json();
    this.musicas = r.items;
    this.nextToken = r.nextPageToken;
    this.previousToken = r.prevPageToken;
  }

  private isMobile() {
    let check = false;

    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)/i
          .test(a) ||
        /iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket/i
          .test(a) ||
        /psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
          .test(a) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu/i
          .test(a.substr(0, 4)) ||
        /ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi/i
          .test(a.substr(0, 4)) ||
        /ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)/i
          .test(a.substr(0, 4)) ||
        /em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie/i
          .test(a.substr(0, 4)) ||
        /hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)/i
          .test(a.substr(0, 4)) ||
        /ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)/i
          .test(a.substr(0, 4)) ||
        /le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)/i
          .test(a.substr(0, 4)) ||
        /mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)/i
          .test(a.substr(0, 4)) ||
        /n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg/i
          .test(a.substr(0, 4)) ||
        /pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)/i
          .test(a.substr(0, 4)) ||
        /qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)/i
          .test(a.substr(0, 4)) ||
        /sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)/i
          .test(a.substr(0, 4)) ||
        /t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)/i
          .test(a.substr(0, 4)) ||
        /utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )/i
          .test(a.substr(0, 4)) ||
        /webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
          .test(a.substr(0, 4))) {

        check = true;
      }
    })(navigator.userAgent || navigator.vendor || (<any>window).opera);

    return check;
  };

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
  }

  savePlayer(event, musica) {
    this.players[musica.id.videoId] = event;
    this.players[musica.id.videoId].playVideo();
  }

  onStateChange(event, musica) {
    if (this.isMobile()) {
      if (event.data === -1) {
        this.testando[musica.id.videoId] = false;
        musica.erro = true;
      } else {
        setTimeout(() => {
          if (this.testando[musica.id.videoId]) {
            this.testando[musica.id.videoId] = false;
            this.musicasDB.adicionarMusica(musica, this.user);
          }
        }, this.defaults.tempoEsperaMobile);
      }
    } else {
      if (event.data !== 3 && event.data !== -1) {
        this.testando[musica.id.videoId] = false;
        this.musicasDB.adicionarMusica(musica, this.user);
      } else if (event.data === -1) {
        this.testando[musica.id.videoId] = false;
        musica.erro = true;
      }
    }
  }

}
