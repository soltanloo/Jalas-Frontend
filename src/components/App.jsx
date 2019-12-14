import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import NewMeeting from './NewMeeting';
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import ViewMeeting from "./ViewMeeting";
import NewPoll from "./NewPoll";
import ViewPoll from "./ViewPoll";

function App() {
  return (
    <Router>
      <ToastContainer rtl toastClassName={"custom-toast"} />
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
          <Route path={"/meeting/:id"} component={ViewMeeting} />
          <Route path="/new-poll" component={NewPoll} />
          <Route path={"/poll/:id"} component={ViewPoll} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
