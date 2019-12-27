import { Redirect, Route } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={(innerProps) => (props.isLoggedIn
      ? <Component {...innerProps} />
      : <Redirect to="/login" />)}
  />
);

export default PrivateRoute;
