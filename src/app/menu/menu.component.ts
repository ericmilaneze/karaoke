import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  showingMenu = false;

  constructor(
    private authService: AuthService,
    private af: AngularFire,
    private router: Router) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.showingMenu = true;
      }
      else {
        this.showingMenu = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
