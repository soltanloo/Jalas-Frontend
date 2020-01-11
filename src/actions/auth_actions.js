import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { timeout } from 'q';
import Config from '../config/config';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const FETCH_USER = 'FETCH_USER';
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
        userId: jwt_decode(localStorage.authToken).userId,
        userRole: jwt_decode(localStorage.authToken).role,
      });
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
      userId: jwt_decode(localStorage.authToken).userId,
      userRole: jwt_decode(localStorage.authToken).role,
    });
  };
}

export function fetchUserDetails(id) {
  return (dispatch) => {
    axios.get(`${Config.baseURL}/getProfile`)
      .then((res) => {
        dispatch({
          type: FETCH_USER,
          userDetails: res.data,
        });
      });
  };
}
