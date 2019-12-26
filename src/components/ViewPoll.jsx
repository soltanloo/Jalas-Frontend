import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import { TextField, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import JalaaliUtils from '@date-io/jalaali';
import moment from 'moment';
import {
  addOption, fetchPoll, removeOption, vote,
} from '../actions/poll_actions';
import { justEnglishDigits, toEnglishDigits, toPersianDigits } from '../helpers/lang_helper';
import getPermission from '../selectors/Permission';

class ViewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      startTime: new Date(),
      finishTime: new Date(),
    };
  }

  componentDidMount() {
    if (!this.props.curr || (this.props.curr.id !== this.props.match.params.id)) {
      this.props.fetchPoll(this.props.match.params.id);
    }
  }

  handleStartTimeChange = (date) => {
    this.setState({ startTime: date });
  };

  handleFinishTimeChange = (date) => {
    this.setState({ finishTime: date });
  };

  handleAddTimes = () => {
    const { startTime, finishTime } = this.state;
    this.props.addOption(
      this.props.curr.id,
      this.props.userId,
      moment(startTime).format('YYYY-MM-DDTHH:mm:ss'),
      moment(finishTime).format('YYYY-MM-DDTHH:mm:ss'),
      () => this.props.fetchPoll(this.props.curr.id),
    );
  };

  handleRemoveOption = (optionId) => {
    this.props.removeOption(this.props.curr.id, this.props.user, optionId, () => this.props.fetchPoll(this.props.curr.id));
  };

  handleUserIdChange = (event) => {
    this.setState({ userId: justEnglishDigits(toEnglishDigits(event.target.value)) });
  };

  renderOptions = () => this.props.curr.options.map((option) => (
    <Card
      key={`option-${option.id}`}
      style={{
        width: 'auto',
        margin: 10,
      }}
    >
      <CardContent>
        <Typography>
              زمان شروع:
          {' '}
          {toPersianDigits(jMoment(option.startTime, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jM/jD HH:mm'))}
        </Typography>
        <Typography>
              زمان پایان:
          {' '}
          {toPersianDigits(jMoment(option.finishTime, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jM/jD HH:mm'))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button disabled={option.userList.some((userId) => parseInt(userId) === parseInt(this.state.userId))} onClick={() => this.props.vote(option.id, this.props.curr.id, this.state.userId)} size="small">ثبت رأی</Button>
        {this.props.permissions.isCurrentUser(this.props.curr.ownerId)
              && <Button onClick={() => this.handleRemoveOption(option.id)}>حذف</Button>}
      </CardActions>
    </Card>
  ));

  render() {
    if (!this.props.curr) {
      return <p>در حال بارگذاری...</p>;
    }
    if (!this.props.curr.ongoing) {
      return <p>نظرسنجی غیرفعال است.</p>;
    }
    return (
      <div style={{
        padding: 10,
      }}
      >
        <h3>{this.props.curr.title}</h3>
        {/*<TextField*/}
        {/*  id="userId"*/}
        {/*  label="شناسه کاربری رأی‌دهنده"*/}
        {/*  value={toPersianDigits(this.state.userId)}*/}
        {/*  onChange={this.handleUserIdChange}*/}
        {/*/>*/}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
        >
          {this.renderOptions()}
        </div>
        {this.props.permissions.isCurrentUser(this.props.curr.ownerId)
          && (
          <div>
            <Typography component="p">
              افزودن گزینه‌های جدید:
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
                  labelFunc={(date) => (date ? date.format('jYYYY/jM/jD HH:mm') : '')}
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
                  labelFunc={(date) => (date ? date.format('jYYYY/jM/jD HH:mm') : '')}
                />
              </MuiPickersUtilsProvider>
              <Button onClick={this.handleAddTimes}>
                اضافه‌کردن گزینه
              </Button>
            </div>
          </div>
          )}
      </div>
    );
  }
}

ViewPoll.propTypes = {
  curr: PropTypes.object.isRequired,
  fetchPoll: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  curr: state.currentPoll,
  permissions: getPermission(state),
  userId: state.auth.user,
});

const mapDispatchToProps = {
  fetchPoll,
  vote,
  addOption,
  removeOption,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoll);
