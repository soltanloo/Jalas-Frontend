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
import AuthPage from "./auth/AuthPage";

axios.defaults.baseURL = Config.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

const authToken = localStorage.getItem('authToken');
if (authToken) axios.defaults.headers.common.Authorization = `JWT ${authToken}`;

class App extends React.Component {
  componentDidMount() {
    if (localStorage.authToken) {
      this.props.fetchUser(localStorage.authToken);
    }
  }

  render() {
    return (
      <Router>
        <ToastContainer rtl toastClassName={'custom-toast'} />
        <div>
          {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}
          <Switch>
            <Route path="/new-meeting" component={NewMeeting} />
            <Route path={'/meeting/:id'} component={ViewMeeting} />
            <Route path="/new-poll" component={NewPoll} />
            <Route path={'/poll/:id'} component={ViewPoll} />
            <Route
              path="/login"
              render={(props) => (<AuthPage mode={'login'} {...props} />)}
            />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = {
  fetchUser,
};

export default connect(null, mapDispatchToProps)(App);
