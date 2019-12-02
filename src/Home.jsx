import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from './logo_transparent.png';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default class Home extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            جلسه‌هایت را محقق کن!
          </p>
          <Button component={Link} to="/new-meeting" variant="contained" color="primary">
            جلسهٔ جدید
          </Button>
        </header>
      </div>
    )
  }
}
