import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMetrics } from '../actions/analytic_actions';

class AdminPanel extends Component {
  componentDidMount() {
    this.props.fetchMetrics();
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.data).map((obj, i) => {
          return (
            <div>
              {obj}: {this.props.data[obj]}
            </div>
          )})
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.analytics.metrics,
});

const mapDispatchToProps = {
  fetchMetrics,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
