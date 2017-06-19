import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserInfo } from 'firebase';
import { userInfo } from 'os';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from './auth.service';

@Injectable()
export class UsuarioService {

  isUsuarioMasterEvent = new EventEmitter<boolean>();

  constructor(
    private af: AngularFire,
    private as: AuthService) { }

  verificarSeUsuarioMaster(user: firebase.User) {
    return this.af.database.list('/usuarios')
      .map(usuarios => {
        if (!!usuarios && usuarios.length > 0) {
          return usuarios[0].$value === user.uid;
        }

        return false;
      });
  }

}
