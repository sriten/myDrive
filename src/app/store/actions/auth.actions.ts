import {Action, createAction, props} from '@ngrx/store';

export const loadAuths = createAction(
  '[Auth] Load Auths'
);

export enum AuthActionTypes {
  SIGNIN = '[Auth] Signin',
  SIGNIN_SUCCESS = '[Auth] Signin Success',
  SIGNIN_FAILURE = '[Auth] Signin Failed'
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SIGNIN;
  constructor(public payload?: any) {}
}

export class SignInSuccess implements Action {
  readonly type = AuthActionTypes.SIGNIN_SUCCESS;
  constructor(public payload?: any) {}
}

export class SignInFailure implements Action {
  readonly type = AuthActionTypes.SIGNIN_FAILURE;
  constructor(public payload?: any) {}
}
export type All =
  | SignIn
  | SignInSuccess
  | SignInFailure;

