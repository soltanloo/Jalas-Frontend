const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const FETCH_USER = 'FETCH_USER';
const LOGOUT = 'LOGOUT';

const initialState = {
  isAuthenticating: false,
  userId: null,
  userRole: null,
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
      return { ...state, userId: action.userId, userRole: action.userRole };
    case LOGOUT:
      return {
        ...state,
        isAuthenticating: false,
        userId: null,
        userRole: null,
        errorMessage: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case FETCH_USER:
      return {
        ...state,
        userDetails: action.userDetails,
      }
    default:
      return state;
  }
}
