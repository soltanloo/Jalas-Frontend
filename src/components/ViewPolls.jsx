import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../actions/poll_actions';

class ViewPolls extends Component {
  componentDidMount() {
    this.props.fetchPolls();
  }

  render() {
    return (
      <div />
    );
  }
}

const mapStateToProps = (state) => ({
  polls: state.polls,
});

const mapDispatchToProps = {
  fetchPolls,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(ViewPolls);
