import axios from 'axios';
import QS from 'querystring';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { timeout } from 'q';
import baseURL from '../config/config';

const url = 'http://185.166.107.169:32090/joboonja';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const LOGOUT = 'LOGOUT';

export function login(credentials, callback) {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    axios.post(`${baseURL}/auth/login`, QS.stringify(credentials)).then((res) => {
      localStorage.authToken = res.data.message;
      timeout(300);
      toast.success('ورود با موفقیت انجام شد');
      dispatch({
        type: LOGIN_SUCCESS,
        user: jwt_decode(localStorage.authToken).userId,
      });
      // callback();
    }).catch((error) => {
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
