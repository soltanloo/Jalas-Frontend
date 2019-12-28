import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPerformance } from '../actions/analytic_actions';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

class PerformancePanel extends Component {
  componentDidMount() {
    this.props.fetchPerformance();
  }

  render() {
    const {
      meetingsPerPoll,
      meetingsNum,
      pollsNum,
      creationMeanTime,
    } = this.props.data;
    return (
      <Paper style={{ padding: 10 }}>
        <Typography>
          نرخ ایجاد جلسه به‌ازای تعداد نظرسنجی‌ها: {meetingsPerPoll}
        </Typography>
        <Typography>
          تعداد جلسات ایجادشده: {meetingsNum}
        </Typography>
        <Typography>
          تعداد نظرسنجی‌های ایجادشده: {pollsNum}
        </Typography>
        <Typography>
          میانگین زمان ایجاد جلسه و نظرسنجی‌: {creationMeanTime} میلی‌ثانیه
        </Typography>
      </Paper>
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
