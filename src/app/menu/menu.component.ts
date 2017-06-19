import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, Renderer, ViewChild } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { AuthService } from '../_services/auth.service';
import { UsuarioService } from '../_services/usuario.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  @ViewChild('idMain')
  idMainElement: ElementRef

  showingMenu: boolean;
  showingCantar: boolean;

  constructor(
    private authService: AuthService,
    private af: AngularFire,
    private rd: Renderer,
    private router: Router,
    private us: UsuarioService) { }

  ngOnInit() {
    this.af.auth
      .subscribe(authState => this.showingMenu = !!authState);

    this.af.auth
      .switchMap(authState => {
        if (!!authState && !!authState.auth) {
          return this.us.verificarSeUsuarioMaster(authState.auth)
            .map(isUsuarioMaster => {
              return isUsuarioMaster;
            });
        }

        return Observable.of(false);
      })
      .subscribe(isUsuarioMaster => this.showingCantar = isUsuarioMaster);
  }

  logout() {
    this.authService.logout();
  }

  esconderMenu() {
    this.rd.setElementClass(this.idMainElement.nativeElement, 'in', false);
  }

}
