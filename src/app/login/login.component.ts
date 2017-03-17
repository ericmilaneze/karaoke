import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  private navigateHome = () => this.router.navigate(["home"]);

  loginGoogle() {
    this.authService.authenticateGoogle()
      .then(this.navigateHome);
  }

  loginFacebook() {
    this.authService.authenticateFacebook()
      .then(this.navigateHome);
  }

  loginTwitter() {
    this.authService.authenticateTwitter()
      .then(this.navigateHome);
  }

}
