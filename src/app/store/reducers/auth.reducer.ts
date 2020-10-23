import {Action} from '@ngrx/store';
import {User} from '../../../models/user';
import {AuthActionTypes, All} from '../actions/auth.actions';


export const authFeatureKey = 'auth';

// tslint:disable-next-line:no-empty-interface
export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};


export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_SUCCESS : {
      return {
        ...state,
        isAuthenticated: true,
        user: null,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNIN_FAILURE : {
      return {
        ...state,
        errorMessage: 'Google authentication failed.'
      };
    }
    default: {
      return state;
    }
  }
}
