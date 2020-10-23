import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {GapiSession} from '../../../middleware/session/gapi.session';
import {AppContext} from '../../../middleware/app.context';
import {Observable, of, throwError} from 'rxjs';
import {AuthActionTypes, SignInFailure, SignInSuccess} from '../actions/auth.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';


@Injectable()
export class AuthEffects {

  @Effect()
  SignIn: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.SIGNIN),
      exhaustMap(() =>
        this.appContext.Session.Gapi.signIn().pipe(
          map(user => new SignInSuccess({user})),
          // tslint:disable-next-line:no-shadowed-variable
          catchError(error => of(new SignInFailure({error})))
        )
      )
    );

  @Effect({dispatch: false})
  SignInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNIN_SUCCESS),
    tap(() => {
      if (this.appContext.Session.Gapi.isSignedIn) {
        this.router.navigate(['/dashboard']).then(r => console.debug(r));
      }
      // else {
      //  throw(error('Google Auth failed'));
      // }
    })
  );

  @Effect({ dispatch: false })
  SignInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNIN_FAILURE)
  );

  constructor(
    private actions: Actions,
    private gapiSession: GapiSession,
    private router: Router,
    private appContext: AppContext
  ) {
  }

}

