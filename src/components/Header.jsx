import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth_actions';

class Header extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Paper style={{ padding: 10 }}>
        <div style={{ display: 'flex' }}>
          <Button component={Link} to="/new-poll" variant="contained" color="primary" style={{ margin: 5 }}>
            نظرسنجی جدید
          </Button>
          <Button component={Link} to="/new-meeting" variant="contained" color="primary" style={{ margin: 5 }}>
            جلسهٔ جدید
          </Button>
          {!isLoggedIn
            ? (
              <Button component={Link} to="/login" variant="contained" color="secondary" style={{ margin: '5', marginRight: 'auto' }}>
          ورود
              </Button>
            )
            : (
              <div style={{ display: 'flex', marginRight: 'auto' }}>
                <Button component={Link} to="/meetings" variant="contained" style={{ margin: 5 }}>
            جلسه‌های من
                </Button>
                <Button component={Link} to="/polls" variant="contained" style={{ margin: 5 }}>
            نظرسنجی‌های من
                </Button>
                <Button component={Link} to="/" onClick={() => this.props.logout()} color="secondary" style={{ margin: '5' }}>
                  خروج
                </Button>
              </div>
            )}
        </div>
      </Paper>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(null, { logout })(Header);
