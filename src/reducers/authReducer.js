import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../actions/types';

const initialState = {
  user: {},
  authenticated: false,
  logout: false,
  requested: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        requested: true,
        authenticated: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        requested: false,
        authenticated: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        user: {},
        requested: false,
        authenticated: false
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        requested: false,
        authenticated: false,
        logout: true,
      };
    default:
      return state;
  }
}
