import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMetrics } from '../actions/analytic_actions';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class AdminPanel extends Component {
  componentDidMount() {
    this.props.fetchMetrics();
  }

  render() {
    const {
      reservedRoomsNum,
      usersNum,
      meetingsNum,
      pollsNum,
      canceledMeetingsNum,
      commentsNum,
    } = this.props.data;
    return (
      <Paper style={{ padding: 10 }}>
        <Typography>
          تعداد کاربران: {usersNum}
        </Typography>
        <Typography>
          تعداد جلسات ایجادشده: {meetingsNum}
        </Typography>
        <Typography>
          تعداد نظرسنجی‌های ایجادشده: {pollsNum}
        </Typography>
        <Typography>
          تعداد نظرها: {commentsNum}
        </Typography>
        <Typography>
          تعداد جلسات لغوشده: {canceledMeetingsNum}
        </Typography>
        <Typography>
          تعداد اتاق‌های رزروشده: {reservedRoomsNum}
        </Typography>
      </Paper>
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
