import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { timeout } from 'q';
import Config from '../config/config';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

export function login(credentials, callback) {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    axios.post(`${Config.baseURL}/login`, credentials).then((res) => {
      localStorage.authToken = res.headers['user-token'];
      timeout(300);
      toast.success('ورود با موفقیت انجام شد');
      dispatch({
        type: LOGIN_SUCCESS,
        user: jwt_decode(localStorage.authToken).userId,
      });
      // callback();
    }).catch((error) => {
      dispatch({
        type: LOGIN_FAILURE,
        errorMessage: 'ورود با خطا مواجه شد',
      });
      toast.error('ورود با خطا مواجه شد');
    });
  };
}

export function logout() {
  delete localStorage.authToken;
  toast.success('خروج با موفقیت انجام شد');
  return { type: LOGOUT };
}

export function fetchUser(token) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS,
      user: jwt_decode(localStorage.authToken).userId,
    });
  };
}
