import { Action, createReducer, on } from '@ngrx/store';


export const authFeatureKey = 'auth';

// tslint:disable-next-line:no-empty-interface
export interface State {

}

export const initialState: State = {

};


export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state;
  }
}
