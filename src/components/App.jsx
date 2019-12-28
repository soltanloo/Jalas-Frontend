import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Home from './Home';
import NewMeeting from './NewMeeting';
import { fetchUser } from '../actions/auth_actions';

import 'react-toastify/dist/ReactToastify.css';
import ViewMeeting from './ViewMeeting';
import NewPoll from './NewPoll';
import ViewPoll from './ViewPoll';
import Config from '../config/config';
import AuthPage from './auth/AuthPage';
import ViewPolls from './ViewPolls';
import ViewMeetings from './ViewMeetings';
import PrivateRoute from './PrivateRoute';
import Header from './Header';

axios.defaults.baseURL = Config.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.common['filter-type'] = 'local';

class App extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const authToken = localStorage.getItem('authToken');
    if (authToken) axios.defaults.headers.common['user-token'] = `${authToken}`;
  }

  componentDidMount() {
    if (localStorage.authToken) {
      this.props.fetchUser(localStorage.authToken);
    }
  }

  render() {
    return (
      <Router>
        <ToastContainer rtl toastClassName={'custom-toast'} />
        <Route path="/" render={(props) => (props.location.pathname !== '/') && <Header isLoggedIn={!!this.props.isLoggedIn} />} />
        <Switch>
          <Route exact path="/" render={(props) => <Home isLoggedIn={localStorage.authToken} {...props} />} />
          <Route
            exact
            path="/login"
            render={(props) => (<AuthPage mode={'login'} {...props} />)}
          />
          <PrivateRoute isLoggedIn={localStorage.authToken} path="/new-meeting" component={NewMeeting} />
          <PrivateRoute isLoggedIn={localStorage.authToken} path={'/meetings'} component={ViewMeetings} />
          <PrivateRoute isLoggedIn={localStorage.authToken} path={'/meeting/:id'} component={ViewMeeting} />
          <PrivateRoute isLoggedIn={localStorage.authToken} path="/new-poll" component={NewPoll} />
          <PrivateRoute isLoggedIn={localStorage.authToken} path={'/polls'} component={ViewPolls} />
          <PrivateRoute isLoggedIn={localStorage.authToken} path={'/poll/:id'} component={ViewPoll} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.user,
});

const mapDispatchToProps = {
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
