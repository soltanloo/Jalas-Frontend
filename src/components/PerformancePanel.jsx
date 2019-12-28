import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPerformance } from '../actions/analytic_actions';

class PerformancePanel extends Component {
  componentDidMount() {
    this.props.fetchPerformance();
  }

  render() {
    return (
      <div>
        {this.props.data && Object.keys(this.props.data).map((obj, i) => {
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
  data: state.analytics.performance,
});

const mapDispatchToProps = {
  fetchPerformance,
};

export default connect(mapStateToProps, mapDispatchToProps)(PerformancePanel);
