import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'jss';
import rtl from 'jss-rtl';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import App from './components/App';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk))(createStore);

axios.interceptors.response.use(undefined, (error) => {
  if (error.response && error.response.status) {
    if (error.response.status === 401) {
      localStorage.removeItem('authToken');
      toast.warn('لطفاً ابتدا وارد حساب کاربری خود شوید');
      return Promise.reject(error);
    }
    if (error.response.status === 403) {
      localStorage.removeItem('authToken');
      toast.warn('لطفاً مجدداً وارد حساب کاربری خود شوید');
      return Promise.reject(error);
    }
    if (error.response.status === 404) {
      toast.warn('صفحهٔ موردنظر یافت نشد');
    }
  }
  return Promise.reject(error);
});

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <CssBaseline />
        <App />
      </StylesProvider>
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
