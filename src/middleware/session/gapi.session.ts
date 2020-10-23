import {Injectable} from '@angular/core';
import {AppService} from '../services/app.service';
import {from, Observable, of} from 'rxjs';

const CLIENT_ID = '1011369510618-qc2mlvvhakoq10klc0ffvs6jsmu2o6sb.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBWTurq8qj0CCQFyrUY4joX_PB4us02Z0k';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive';

@Injectable()
export class GapiSession {
  googleAuth: gapi.auth2.GoogleAuth;

  constructor(
    private appSvc: AppService
  ) {
  }

  get isSignedIn(): boolean {
    return this.googleAuth.isSignedIn.get();
  }

  initClient() {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        return gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        }).then(() => {
          this.googleAuth = gapi.auth2.getAuthInstance();
          resolve();
        });
      });
    });

  }

  signIn(): Observable<any> {
    const auth = this.googleAuth.signIn({
      prompt: 'consent'
    }).then((googleUser: gapi.auth2.GoogleUser) => {
      this.appSvc.User.add(googleUser.getBasicProfile());
    });
    return of(auth);
  }

  signOut(): void {
    this.googleAuth.signOut();
  }
}
