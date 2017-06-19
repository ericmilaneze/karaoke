import { Injectable, state } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

import { AuthService } from './../_services/auth.service';
import { UsuarioService } from '../_services/usuario.service';

@Injectable()
export class CanActivateMasterSignedInGuard implements CanActivate {
  constructor(
    private af: AngularFire,
    private router: Router,
    private us: UsuarioService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.af.auth
      .switchMap(authState => {
        if (!authState || !authState.auth) {
          this.router.navigate(['login']);

          return Observable.of(false);
        }

        return this.us.verificarSeUsuarioMaster(authState.auth)
          .map(isUsuarioMaster => {
            if (!isUsuarioMaster)
              this.router.navigate(['login']);

            return isUsuarioMaster;
          });
    });
  }
}
