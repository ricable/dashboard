import { Action } from "@ngrx/store";
import { Actions } from "./actions";

export enum AuthStatus {
  LoggedIn = 0,
  LoggedOut = 1,
}

export interface Auth {
  profile: any;
  token: string;
  state: AuthStatus;
}

const initialState: Auth = {
  profile: [],
  token: "",
  state: AuthStatus.LoggedOut
};

export function authReducer(state: Auth = initialState, action: Action): Auth {
  switch (action.type) {
    case Actions.LOGGED_IN:
      return Object.assign({}, state, {
        profile: {},
        token: action.payload.token,
        state: AuthStatus.LoggedIn
      });
    case Actions.LOGGED_OUT:
      return Object.assign({}, state, {
        profile: null,
        token: null,
        state: AuthStatus.LoggedOut
      });
    case Actions.FETCH_PROFILE:
      return Object.assign({}, state, {
        profile: action.payload.profile,
        token: state.token,
        state: state.state
      });
    default:
      return state;
  }
}


export const getProfile = (state: Auth) => state.profile;
export const getAuthState = (state: Auth) => state.state;