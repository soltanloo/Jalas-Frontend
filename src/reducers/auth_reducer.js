const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const LOGOUT = 'LOGOUT';

const initialState = {
  isAuthenticating: false,
  user: null,
  errorMessage: null,
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        errorMessage: action.errorMessage,
      };
    case LOGIN_SUCCESS:
      return { ...state, user: action.user };
    case LOGOUT:
      return {
        ...state,
        isAuthenticating: false,
        user: null,
        errorMessage: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
}
