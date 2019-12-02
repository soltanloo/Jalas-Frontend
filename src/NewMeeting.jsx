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
import { toPersianDigits } from './helpers/lang_helper';
import { fetchPoll, fetchPolls } from "./actions/poll_actions";
import { fetchAvailableRooms } from "./actions/room_actions";
import { createMeeting } from "./actions/meeting_actions";

const initialState = {
  time: undefined,
  poll: undefined,
  room: undefined,
  activeStep: 0,
};

class NewMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
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

  handleSelectPoll(event) {
    this.setState({ poll: event.target.value });
    this.props.getPoll(event.target.value);
  }

  handleSelectTime(event) {
    this.setState({ time: event.target.value });
    this.props.getAvailableRooms(new Date(), new Date()); // FIXME
  }
  
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
                  name: 'time',
                  id: 'outlined-age-native-simple',
                }}
              >
                {this.renderRooms()}
              </Select>
            </FormControl>
          </>
        );
      default:
        return 'مرحلهٔ ناشناخته';
    }
  };

  renderPolls() {
    this.props.polls.map(poll => {
      return <option value={poll.id}>{poll.title}</option>;
    })
  }

  renderTimes() {
    this.props.selectedPoll.options.map(op => {
      return <option value={op.id}>{op.title} - {op.voteCount} رأی</option>;
    })
  }

  renderRooms() {
    this.props.availableRooms.map(room => {
      return <option value={room.id}>{room.title}</option>;
    })
  }

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

  submitMeeting = () => {
    this.props.createMeeting();
  };

  canStepForward = () => {
    return (this.state.activeStep === 0 && this.props.selectedPoll !== null) ||
      (this.state.activeStep === 1 && this.state.time !== undefined);
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
                <Typography>{this.getStepContent(this.state.activeStep)}</Typography>
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
        <Button onClick={this.submitMeeting} variant="contained" color="primary" disabled={false}>
          ایجاد جلسه
        </Button>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  polls: state.polls,
  selectedPoll: state.selectedPoll,
  availableRooms: state.availableRooms,
});

const mapDispatchToProps = {
  getPolls: () => fetchPolls(),
  getPoll: (id) => fetchPoll(id),
  getAvailableRooms: (from, to) => fetchAvailableRooms(from, to),
  createMeeting: (roomId, from, to, title) => createMeeting(),
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMeeting);
