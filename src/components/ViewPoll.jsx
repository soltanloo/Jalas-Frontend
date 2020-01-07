import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import JalaaliUtils from '@date-io/jalaali';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {
  addOption,
  fetchPoll,
  removeOption,
  vote,
  addComment,
  deleteComment,
  inviteToPoll,
  removeFromPoll,
  editComment,
  closePoll,
} from '../actions/poll_actions';
import { justEnglishDigits, toEnglishDigits, toPersianDigits } from '../helpers/lang_helper';
import getPermission from '../selectors/Permission';
import Comments from './Comments';

class ViewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      startTime: new Date(),
      finishTime: new Date(),
      email: '',
      emailRemove: '',
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
        {!option.userList.some((id) => id === parseInt(this.props.userId))
          && (
          <Button
            disabled={option.userList.some((userId) => parseInt(userId) === parseInt(this.state.userId))}
            onClick={() => this.props.vote(option.id, this.props.curr.id, this.state.userId)}
            size="small"
          >
            ثبت رأی
          </Button>
          )}
        {this.props.permissions.isCurrentUser(this.props.curr.ownerId)
              && <Button color="secondary" onClick={() => this.handleRemoveOption(option.id)}>حذف</Button>}
      </CardActions>
    </Card>
  ));

  handleSubmitComment = (text) => {
    this.props.addComment({
      pollId: this.props.curr.id,
      text,
    }, () => this.props.fetchPoll(this.props.curr.id));
  };

  handleSubmitReply = (parentId, text) => {
    this.props.addComment({
      pollId: this.props.curr.id,
      text,
      repliedCommentId: parentId,
    }, () => this.props.fetchPoll(this.props.curr.id));
  };

  handleEditComment = (data) => {
    this.props.editComment({ ...data, pollId: this.props.curr.id }, () => this.props.fetchPoll(this.props.curr.id));
  };

  handleDeleteComment = (commentId) => {
    this.props.deleteComment(commentId, this.props.curr.id,
      () => this.props.fetchPoll(this.props.curr.id));
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleEmailRemoveChange = (event) => {
    this.setState({ emailRemove: event.target.value });
  };

  addParticipant = () => {
    this.setState({ email: '' });
    this.props.inviteToPoll(this.state.email, this.props.curr.id, this.state.userID);
  };

  removeParticipant = () => {
    this.setState({ emailRemove: '' });
    this.props.removeFromPoll(this.state.emailRemove, this.props.curr.id, this.state.userID);
  };

  handleClosePoll = () => {
    this.props.closePoll(this.props.curr.id, () => this.props.fetchPoll(this.props.curr.id));
  };

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
        <h3>
          {this.props.curr.title}
          <span style={{ marginRight: 15 }}>
            <Button color={'secondary'} onClick={this.handleClosePoll}>بستن نظرسنجی</Button>
          </span>
        </h3>
        <Typography component="p">
          گزینه‌ها:
        </Typography>
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
            <Paper style={{ padding: 10 }}>
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
                <Button variant={'contained'} color={'primary'} onClick={this.addParticipant} style={{ margin: '0 5px' }}>
                  دعوت
                </Button>
                <TextField
                  id="user-email-remove"
                  label="ایمیل"
                  value={this.state.emailRemove}
                  onChange={this.handleEmailRemoveChange}
                />
                <Button color={'secondary'} onClick={this.removeParticipant} style={{ margin: '0 5px' }}>
                  لغو دعوت
                </Button>
              </div>
            </Paper>
            <br />
            <Paper style={{ padding: 10 }}>
              <Typography component="p">
                افزودن گزینه‌های جدید:
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
                <Button variant={'contained'} color={'primary'} style={{ margin: 5 }} onClick={this.handleAddTimes}>
                  اضافه‌کردن گزینه
                </Button>
              </div>
            </Paper>
          </div>
          )}
        <Comments
          comments={this.props.curr.comments}
          onSubmitComment={this.handleSubmitComment}
          onDeleteComment={this.handleDeleteComment}
          onEditComment={this.handleEditComment}
          onSubmitReply={this.handleSubmitReply}
          hasPermToDelete={(commenterId) => this.props.permissions.isCurrentUser(commenterId)
            || this.props.permissions.isCurrentUser(this.props.curr.ownerId)}
          hasPermToEdit={(commenterId) => this.props.permissions.isCurrentUser(commenterId)
            || this.props.permissions.isCurrentUser(this.props.curr.ownerId)}
        />
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
  userId: state.auth.userId,
});

const mapDispatchToProps = {
  fetchPoll,
  vote,
  addOption,
  removeOption,
  addComment,
  deleteComment,
  inviteToPoll,
  removeFromPoll,
  editComment,
  closePoll,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoll);
