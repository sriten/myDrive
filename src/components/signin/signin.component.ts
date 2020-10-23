import {Component, NgZone} from '@angular/core';
import {AppContext} from '../../middleware/app.context';
import {Store} from '@ngrx/store';
import {AppState} from '../../app/store/app.states';
import {SignIn} from '../../app/store/actions/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent {
  constructor(
    private appContext: AppContext,
    // private router: Router,
    private zone: NgZone,
    private store: Store<AppState>
  ) {

  }

  signIn() {
    this.zone.run(() => {
      // return this.appContext.Session.Gapi.signIn();
      // this.appContext.Session.Gapi.signIn()
      //   .then(() => {
      // if (this.appContext.Session.Gapi.isSignedIn) {
      //   this.router.navigate(['/dashboard']).then(r => console.debug(r));
      // }
      // });
      // const payload = {
      //   user: this.appContext.Repository.User.getAll()
      // };
      this.store.dispatch(new SignIn());
    });
  }


}
