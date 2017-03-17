import { Injectable } from '@angular/core';

@Injectable()
export class GerenciadorFilaService {

  constructor() { }

  retornarFila(musicas: any[]) {
    return musicas.filter(m => !m.played);
  }

  retornarProxima(musicas: any[]) {
    let fila = this.retornarFila(musicas);

    if (fila.length > 0)
      return fila[0];

    return null;
  }

}
