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
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import JalaaliUtils from '@date-io/jalaali';
import jMoment from 'moment-jalaali';
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { createPoll, inviteToPoll } from "../actions/poll_actions";

const initialState = {
  title: '',
  userID: 810195410,
  email: '',
  options: [],
  startTime: new Date(),
  finishTime: new Date(),
  activeStep: 0
};

class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  getSteps = () => {
    return ['انتخاب عنوان', 'ساخت گزینه‌های نظرسنجی', 'دعوت افراد'];
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleStartTimeChange = (date) => {
    this.setState({ startTime: date });
  };

  handleFinishTimeChange = (date) => {
    this.setState({ finishTime: date });
  };

  handleAddTimes = () => {
    const { startTime, finishTime } = this.state;
    this.setState({ options: [...this.state.options, { startTime, finishTime }] })
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  };

  handleDeleteOption = (option) => {
    const ops = [...this.state.options];
    let i = ops.indexOf(option);
    if (i !== -1) {
      ops.splice(i, 1);
      this.setState({
        options: ops
      })
    }
  };

  addParticipant = () => {
    this.setState({ email: '' });
    this.props.inviteToPoll(this.state.email, this.state.pollId, this.state.userID);
  };

  renderOptions = () => {
    return this.state.options.map(option => {
      return (
        <li>
          {jMoment(option.startTime).format('jYYYY/jM/jD HH:mm')} تا {jMoment(option.finishTime).format('jYYYY/jM/jD HH:mm')}
          <Button onClick={() => this.handleDeleteOption(option)}>
            حذف
          </Button>
        </li>
        )
    });
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <Typography component="p">
              عنوان نظرسنجی را وارد کنید:
            </Typography>
            <TextField
              id="poll-title"
              label="عنوان"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </>
        );
      case 1:
        return (
          <>
            <Typography component="p">
              گزینه‌های نظرسنجی را مشخص کنید:
            </Typography>
            <div>
              <p>تاریخ شروع:</p>
              <MuiPickersUtilsProvider utils={JalaaliUtils} locale="fa">
                <DateTimePicker
                  value={this.state.startTime}
                  onChange={this.handleStartTimeChange}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  labelFunc={date => (date ? date.format('jYYYY/jM/jD HH:mm') : "")}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <p>تاریخ پایان:</p>
              <MuiPickersUtilsProvider utils={JalaaliUtils} locale="fa">
                <DateTimePicker
                  value={this.state.finishTime}
                  onChange={this.handleFinishTimeChange}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  labelFunc={date => (date ? date.format('jYYYY/jM/jD HH:mm') : "")}
                />
              </MuiPickersUtilsProvider>
              <Button onClick={this.handleAddTimes}>
                اضافه‌کردن گزینه
              </Button>
              <Typography component="p">
                گزینه‌های نظرسنجی:
              </Typography>
              <ul>
                {this.renderOptions()}
              </ul>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Typography component="p">
              افراد مدنظر خود را دعوت کنید:
            </Typography>
            <TextField
              id="user-email"
              label="ایمیل"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <Button onClick={this.addParticipant}>
              افزودن
            </Button>
          </>
        );
      default:
        return 'مرحلهٔ ناشناخته';
    }
  };

  setActiveStep = step => {
    this.setState({ activeStep: step });
  };

  submitPoll = () => {
    this.props.createPoll({
      userID: this.state.userID,
      title: this.state.title,
      options: this.state.options.map(option => {
        return {
          startTime: moment(option.startTime).format('YYYY-MM-DDTHH:mm:ss'),
          finishTime: moment(option.finishTime).format('YYYY-MM-DDTHH:mm:ss'),
        }
      })
    }).then(res => {
      this.setState({ pollId: res.data })
    });
  };

  handleNext = () => {
    if (this.state.activeStep === 1) {
      this.submitPoll();
    }
    this.setActiveStep(this.state.activeStep + 1);
  };

  handleBack = () => {
    this.setActiveStep(this.state.activeStep - 1);
  };

  handleReset = () => {
    this.setState(initialState);
    this.setActiveStep(0);
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
          ایجاد نظرسنجی جدید
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
      </Paper>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  createPoll,
  inviteToPoll,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);
