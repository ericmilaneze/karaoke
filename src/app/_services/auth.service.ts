import { Observable, Subscriber } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AngularFireAuth, AuthMethods, AuthProviders, FirebaseAuthState } from 'angularfire2/auth';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserInfo } from 'firebase';

@Injectable()
export class AuthService {

  constructor(private af: AngularFire) {

  }

  getUserInfo(authState: FirebaseAuthState) {
    if (authState) {
      if (authState.google) {
        return authState.google;
      } else if (authState.facebook) {
        return authState.facebook;
      } else if (authState.twitter) {
        return authState.twitter;
      }
    }

    return null;
  }

  authenticateGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  authenticateFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  authenticateTwitter() {
    return this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    });
  }

  logout() {
    return this.af.auth.logout();
  }

}
