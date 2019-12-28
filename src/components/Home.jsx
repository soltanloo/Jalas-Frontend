import React, { Component } from 'react';
import logo from '../logo_transparent.png';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default class Home extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
  };

  render() {
    const { isAdmin, isProductOwner } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            جلسه‌هایت را محقق کن!
          </p>
          <div style={{ display: 'flex' }}>
            <Button component={Link} to="/new-poll" variant="contained" color="primary" style={{ margin: 5 }}>
              نظرسنجی جدید
            </Button>
            <Button component={Link} to="/new-meeting" variant="contained" color="primary" style={{ margin: 5 }}>
              جلسهٔ جدید
            </Button>
          </div>
          {!this.props.isLoggedIn ?
            <div style={{ display: 'flex' }}>
              <Button component={Link} to="/login" variant="contained" color="secondary" style={{ margin: 5 }}>
                ورود
              </Button>
            </div> :
            <div style={{ display: 'flex' }}>
              <Button component={Link} to="/meetings" variant="contained" style={{ margin: 5 }}>
                جلسه‌های من
              </Button>
              <Button component={Link} to="/polls" variant="contained" style={{ margin: 5 }}>
                نظرسنجی‌های من
              </Button>
              {isAdmin &&
              <Button component={Link} to="/metrics" variant="contained" style={{ margin: 5 }}>
                پنل ادمین
              </Button>
              }
              {isProductOwner &&
              <Button component={Link} to="/performance" variant="contained" style={{ margin: 5 }}>
                پنل مدیر محصول
              </Button>
              }
            </div>
          }
        </header>
      </div>
    )
  }
}
