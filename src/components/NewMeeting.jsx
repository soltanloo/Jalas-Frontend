import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { toPersianDigits } from '../helpers/lang_helper';
import { fetchPoll, fetchPolls } from "../actions/poll_actions";
import { fetchAvailableRooms } from "../actions/room_actions";
import { cancelMeeting, createMeeting } from "../actions/meeting_actions";
import jMoment from 'moment-jalaali';
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from '@material-ui/icons/Refresh';
import Divider from "@material-ui/core/Divider";

const initialState = {
  time: '',
  poll: '',
  room: '',
  activeStep: 0
};

class NewMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  static propTypes = {
    getPolls: PropTypes.func.isRequired,
    getPoll: PropTypes.func.isRequired,
    getAvailableRooms: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPolls();
  }

  getSteps = () => {
    return ['انتخاب نظرسنجی', 'نهایی‌سازی زمان جلسه', 'انتخاب اتاق جلسه'];
  };

  handleSelectPoll = (event) => {
    if (event.target.value !== '') {
      this.setState({ poll: event.target.value });
      this.props.getPoll(event.target.value);
    }
  };

  handleSelectTime = (event) => {
    if (event.target.value !== '') {
      this.setState({ time: event.target.value });
      const option = this.props.currentPoll.options.find(option => {
        return parseInt(option.id) === parseInt(event.target.value);
      });
      this.props.getAvailableRooms(option.startTime, option.finishTime);
    }
  };

  handleFetchRooms = () => {
    const option = this.props.currentPoll.options.find(option => {
      return parseInt(option.id) === parseInt(this.state.time);
    });
    this.props.getAvailableRooms(option.startTime, option.finishTime);
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <Typography component="p">
              نظرسنجی مدنظر خود را انتخاب کنید:
            </Typography>
            <FormControl variant="standard">
              <InputLabel htmlFor="outlined-age-native-simple">
                نظرسنجی
              </InputLabel>
              <Select
                native
                value={this.state.poll}
                onChange={this.handleSelectPoll}
                inputProps={{
                  name: 'poll',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option value="" />
                {this.renderPolls()}
              </Select>
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <Typography component="p">
              زمان جلسه را از میان گزینه‌های موجود نهایی کنید:
            </Typography>
            <FormControl variant="standard">
              <InputLabel htmlFor="outlined-age-native-simple">
                زمان
              </InputLabel>
              <Select
                native
                value={this.state.time}
                onChange={this.handleSelectTime}
                inputProps={{
                  name: 'time',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option value="" />
                {this.renderTimes()}
              </Select>
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <Typography component="p">
              اتاق جلسه را از میان گزینه‌های موجود نهایی کنید:
            </Typography>
            <FormControl variant="standard">
              <InputLabel htmlFor="outlined-age-native-simple">
                اتاق
              </InputLabel>
              <Select
                native
                value={this.state.room}
                onChange={this.handleSelectRoom}
                inputProps={{
                  name: 'room',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option value="" />
                {this.renderRooms()}
              </Select>
            </FormControl>
            <IconButton onClick={this.handleFetchRooms}>
              <RefreshIcon />
            </IconButton>
          </>
        );
      default:
        return 'مرحلهٔ ناشناخته';
    }
  };

  renderPolls = () => {
    return this.props.polls.map(poll => {
      return <option key={'poll-' + poll.id} value={poll.id}>{poll.title}</option>;
    })
  };

  renderTimes = () => {
    return this.props.currentPoll.options.map(op => {
      return <option key={'option-' + op.id} value={op.id}>{jMoment(op.startTime, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jM/jD HH:mm')} تا {jMoment(op.finishTime, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jM/jD HH:mm')} - {op.userList.length} رأی</option>;
    })
  };

  renderRooms = () => {
    return this.props.availableRooms.map(room => {
      return <option key={'room-' + room} value={room}>{room}</option>;
    })
  };

  setActiveStep = step => {
    this.setState({ activeStep: step });
  };

  handleNext = () => {
    this.setActiveStep(this.state.activeStep + 1);
  };

  handleBack = () => {
    this.setActiveStep(this.state.activeStep - 1);
  };

  handleReset = () => {
    this.setState(initialState);
    this.setActiveStep(0);
  };

  handleSelectRoom = (event) => {
    this.setState({ room: event.target.value })
  };

  submitMeeting = () => {
    const option = this.props.currentPoll.options.find(option => {
      return parseInt(option.id) === parseInt(this.state.time);
    });
    this.props.createMeeting(this.state.room, option.startTime, option.finishTime, this.state.poll);
  };

  cancelMeeting = () => {
    this.props.cancelMeeting(this.props.meeting.id);
  };

  canStepForward = () => {
    return (this.state.activeStep === 0 && this.props.currentPoll !== null) ||
      (this.state.activeStep === 1 && this.props.availableRooms !== []) || (this.state.activeStep === 2 && this.state.poll !== null && this.state.time !== null && this.state.room !== null);
  };

  render() {
    const steps = this.getSteps();
    return (
      <Paper style={{
        padding: 10,
      }}>
        <Typography align="center" variant="h4" component="h3">
          ایجاد جلسهٔ جدید
        </Typography>
        <div>
          <Stepper activeStep={this.state.activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel icon={toPersianDigits((index + 1).toString())}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {this.state.activeStep === steps.length ? (
              <div>
                <Typography>تمامی مراحل به پایان رسیده است.</Typography>
                <Button onClick={this.handleReset}>بازنشانی</Button>
              </div>
            ) : (
              <div>
                {this.getStepContent(this.state.activeStep)}
                <Divider variant="middle" style={{ margin: '10px 0' }} />
                <div>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                    // className={classes.backButton}
                  >
                    قبلی
                  </Button>
                  <Button
                    disabled={!this.canStepForward()}
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                  >
                    {this.state.activeStep === steps.length - 1 ? 'پایان' : 'بعدی'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Button onClick={this.submitMeeting} variant="contained" color="primary">
          ایجاد جلسه
        </Button>
        <Button color={'secondary'} onClick={this.cancelMeeting}>
          لغو جلسه
        </Button>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  polls: state.polls,
  currentPoll: state.currentPoll,
  availableRooms: state.availableRooms,
  meeting: state.meeting,
});

const mapDispatchToProps = {
  getPolls: () => fetchPolls(),
  getPoll: (id) => fetchPoll(id),
  getAvailableRooms: (from, to) => fetchAvailableRooms(from, to),
  createMeeting,
  cancelMeeting: (meetingId) => cancelMeeting(meetingId),
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMeeting);
