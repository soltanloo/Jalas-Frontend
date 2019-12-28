import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { cancelMeeting, fetchMeeting } from '../actions/meeting_actions';
import jMoment from "moment-jalaali";
import Button from "@material-ui/core/Button";
import { toPersianDigits } from "../helpers/lang_helper";

class ViewMeeting extends Component {

  componentDidMount() {
    if(!this.props.curr || (this.props.curr.id !== this.props.match.params.id)) {
      this.props.fetchMeeting(this.props.match.params.id);
    }
  }

  cancelMeeting = () => {
    this.props.cancelMeeting(this.props.curr.id);
  };

  render() {
    if (!this.props.curr) {
      return <p>در حال بارگذاری...</p>
    }
    return (
      <div style={{
        padding: 10,
      }}>
        <h3>{this.props.curr.title}</h3>
        <p>شماره اتاق: {this.props.curr.roomNumber}</p>
        <p>زمان برگزاری: از {toPersianDigits(jMoment(this.props.curr.startTime, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jM/jD HH:mm'))} تا {toPersianDigits(jMoment(this.props.curr.finishTime, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jM/jD HH:mm'))}</p>
        <Button color={'secondary'} disabled={this.props.curr.status === 'CANCELLED'} onClick={this.cancelMeeting}>
          لغو جلسه
        </Button>
      </div>
    )
  }
}

ViewMeeting.propTypes = {
  curr: PropTypes.object.isRequired,
  fetchMeeting: PropTypes.func.isRequired,
};

ViewMeeting.defaultProps = {
  curr: {
    title: '',
    roomNumber: '',
    startTime: '',
    finishTime: '',
  },
};

const mapStateToProps = (state) => ({
  curr: state.currentMeeting
});

const mapDispatchToProps = {
  fetchMeeting,
  cancelMeeting: (meetingId) => cancelMeeting(meetingId),
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMeeting)
