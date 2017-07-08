import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Musica } from '../_models/musica';

@Injectable()
export class YoutubeSearchService {
  baseUrl = 'https://www.googleapis.com/youtube/v3/search';
  part = 'snippet';
  key = 'AIzaSyAUXGEHs5Vuz8vxB4Li8xB3DlzCop_2sZU';
  suffix = 'karaoke';
  maxResults = 20;

  constructor(private http: Http) { }

  search(q: string, pageToken?: string) {
    return this.http
      .get(
        `${this.baseUrl}?part=${this.part}&q=${encodeURI(q + ' ' + this.suffix)}` +
        `&maxResults=${this.maxResults}&pageToken=${pageToken ? pageToken : ''}` +
        `&type=video&videoEmbeddable=true&key=${this.key}`);
  }

}
