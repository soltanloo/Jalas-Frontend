import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import JalaaliUtils from '@date-io/jalaali';
import jMoment from 'moment-jalaali';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createPoll, inviteToPoll, removeFromPoll } from '../actions/poll_actions';
import { toPersianDigits } from '../helpers/lang_helper';

const initialState = {
  title: '',
  userID: 810195410,
  email: '',
  emailRemove: '',
  options: [],
  startTime: new Date(),
  finishTime: new Date(),
  deadline: new Date(),
  activeStep: 0,
  shouldAutoSet: false,
};

class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      entryTime: new Date(),
    };
  }

  getSteps = () => ['انتخاب عنوان', 'ساخت گزینه‌های نظرسنجی', 'دعوت افراد'];

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleStartTimeChange = (date) => {
    this.setState({ startTime: date });
  };

  handleDeadlineChange = (date) => {
    this.setState({ deadline: date });
  };

  handleChangeShouldAutoSet = (event) => {
    this.setState({ shouldAutoSet: event.target.checked })
  };

  handleFinishTimeChange = (date) => {
    this.setState({ finishTime: date });
  };

  handleAddTimes = () => {
    const { startTime, finishTime } = this.state;
    this.setState({ options: [...this.state.options, { startTime, finishTime }] });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleEmailRemoveChange = (event) => {
    this.setState({ emailRemove: event.target.value });
  };

  handleDeleteOption = (option) => {
    const ops = [...this.state.options];
    const i = ops.indexOf(option);
    if (i !== -1) {
      ops.splice(i, 1);
      this.setState({
        options: ops,
      });
    }
  };

  addParticipant = () => {
    this.setState({ email: '' });
    this.props.inviteToPoll(this.state.email, this.state.pollId, this.state.userID);
  };

  removeParticipant = () => {
    this.setState({ emailRemove: '' });
    this.props.removeFromPoll(this.state.emailRemove, this.state.pollId, this.state.userID);
  };

  renderOptions = () => this.state.options.map((option, index) => (
    <li key={`option-${index}`}>
      {jMoment(option.startTime).format('jYYYY/jM/jD HH:mm')}
      {' '}
تا
      {jMoment(option.finishTime).format('jYYYY/jM/jD HH:mm')}
      <Button color={'secondary'} onClick={() => this.handleDeleteOption(option)}>
            حذف
      </Button>
    </li>
  ));

  getStepContent = (stepIndex) => {
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
            <div>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={this.state.shouldAutoSet}
                  onChange={this.handleChangeShouldAutoSet}
                  value="primary"
                />
              )}
              label="بستن خودکار نظرسنجی پس از ضرب‌الأجل"
            />
            {this.state.shouldAutoSet
            && (
              <MuiPickersUtilsProvider utils={JalaaliUtils} locale="fa">
                <DateTimePicker
                  value={this.state.deadline}
                  onChange={this.handleDeadlineChange}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  labelFunc={(date) => (date ? date.format('jYYYY/jM/jD HH:mm') : '')}
                />
              </MuiPickersUtilsProvider>
            )}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <Typography component="p">
              گزینه‌های نظرسنجی را مشخص کنید:
            </Typography>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography style={{ margin: 5 }}>تاریخ شروع:</Typography>
              <MuiPickersUtilsProvider utils={JalaaliUtils} locale="fa">
                <DateTimePicker
                  value={this.state.startTime}
                  onChange={this.handleStartTimeChange}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  labelFunc={(date) => (date ? date.format('jYYYY/jM/jD HH:mm') : '')}
                />
              </MuiPickersUtilsProvider>
              <Typography style={{ margin: 5 }}>تاریخ پایان:</Typography>
              <MuiPickersUtilsProvider utils={JalaaliUtils} locale="fa">
                <DateTimePicker
                  value={this.state.finishTime}
                  onChange={this.handleFinishTimeChange}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  labelFunc={(date) => (date ? date.format('jYYYY/jM/jD HH:mm') : '')}
                />
              </MuiPickersUtilsProvider>
              <Button variant={'contained'} color={'primary'} onClick={this.handleAddTimes} style={{ margin: 5 }}>
                اضافه‌کردن گزینه
              </Button>
            </div>
            <div>
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
              افراد مدنظر خود را دعوت یا لغو دعوت کنید:
            </Typography>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <TextField
                id="user-email"
                label="ایمیل"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <Button onClick={this.addParticipant}>
                دعوت
              </Button>
              <TextField
                id="user-email-remove"
                label="ایمیل"
                value={this.state.emailRemove}
                onChange={this.handleEmailRemoveChange}
              />
              <Button color={'secondary'} onClick={this.removeParticipant}>
                لغو دعوت
              </Button>
            </div>
          </>
        );
      default:
        return 'مرحلهٔ ناشناخته';
    }
  };

  setActiveStep = (step) => {
    this.setState({ activeStep: step });
  };

  submitPoll = () => {
    this.props.createPoll({
      // userID: this.state.userID,
      title: this.state.title,
      creationTime: moment(new Date()).diff(this.state.entryTime),
      options: this.state.options.map((option) => ({
        startTime: moment(option.startTime).format('YYYY-MM-DDTHH:mm:ss'),
        finishTime: moment(option.finishTime).format('YYYY-MM-DDTHH:mm:ss'),
      })),
      shouldAutoSet: this.state.shouldAutoSet ? 1 : 0,
      deadline: this.state.shouldAutoSet ? moment(this.state.deadline).format('YYYY-MM-DDTHH:mm:ss') : null,
    }).then((res) => {
      this.setState({ pollId: res.data });
    }).catch((err) => {
      console.log(err);
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

  canStepForward = () => (this.state.activeStep === 0 && this.props.currentPoll !== null)
      || (this.state.activeStep === 1 && this.props.availableRooms !== []) || (this.state.activeStep === 2 && this.state.poll !== null && this.state.time !== null && this.state.room !== null);

  render() {
    const steps = this.getSteps();
    return (
      <Paper style={{
        padding: 10,
      }}
      >
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
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
  createPoll,
  inviteToPoll,
  removeFromPoll,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);
