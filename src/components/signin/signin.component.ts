import { Component, NgZone } from '@angular/core';
import { AppContext } from '../../middleware/app.context';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent {
    constructor(
        private appContext: AppContext,
        private router: Router,
        private zone: NgZone
    ) {

    }

    signIn() {
      this.zone.run(() => {
        this.appContext.Session.Gapi.signIn()
          .then(() => {
            if (this.appContext.Session.Gapi.isSignedIn) {
              this.router.navigate(['/dashboard']).then(r => console.debug(r));
            }
          });
      });
    }


}
