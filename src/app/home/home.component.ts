import { userInfo } from 'os';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { UserInfo } from 'firebase';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userInfo: UserInfo;

  constructor(
    private af: AngularFire,
    private authService: AuthService) { }

  ngOnInit() {
    this.af.auth.subscribe(authState => this.userInfo = this.authService.getUserInfo(authState));
  }

}
