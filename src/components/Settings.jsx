import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { modifyOption } from '../actions/settings_actions';
import { fetchUserDetails } from '../actions/auth_actions';

class Settings extends Component {
  componentDidMount() {
    this.props.fetchUserDetails(this.props.userId);
  }

  handleChangeOption = (optionName) => (event) => {
    this.props.modifyOption(optionName, event.target.checked, () => this.props.fetchUserDetails(this.props.userId));
  };

  render() {
    if (this.props.user) {
      const {
        notifyAddedToPollOn,
        notifyCanceledMeetingOn,
        notifyDeletedOptionOn,
        notifyMentionInCommentOn,
        notifyNewMeetingOn,
        notifyNewOptionOn,
        notifyNewPollCreatedOn,
        notifyNewVoteOn,
        notifyPollClosedOn,
        notifyRemovedFromPollOn,
      } = this.props.user;
      return (
        <Card style={{ padding: 10 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">تنظیمات دریافت اعلان</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={notifyNewOptionOn} onChange={this.handleChangeOption('newOption')} value="newOption" />}
                label="اضافه‌شدن گزینه‌ی جدید به نظرسنجی"
              />
              <FormControlLabel
                control={<Checkbox checked={notifyNewVoteOn} onChange={this.handleChangeOption('newVote')} value="newVote" />}
                label="ثبت رأی جدید"
              />
              <FormControlLabel
                control={<Checkbox checked={notifyDeletedOptionOn} onChange={this.handleChangeOption('deletedOption')} value="deletedOption" />}
                label="حذف‌شدن گزینه از نظرسنجی"
              />
              <FormControlLabel
                control={<Checkbox checked={notifyNewPollCreatedOn} onChange={this.handleChangeOption('newPollCreated')} value="newPollCreated" />}
                label="ساخته‌شدن نظرسنجی جدید"
              />
              <FormControlLabel
                control={<Checkbox checked={notifyAddedToPollOn} onChange={this.handleChangeOption('AddedToPoll')} value="AddedToPoll" />}
                label="دعوت‌شدن به نظرسنجی"
              />
              <FormControlLabel
                control={<Checkbox checked={notifyRemovedFromPollOn} onChange={this.handleChangeOption('RemovedFromPoll')} value="RemovedFromPoll" />}
                label="لغو دعوت به نظرسنجی"
              />
              <FormControlLabel
                control={<Checkbox checked={notifyPollClosedOn} onChange={this.handleChangeOption('pollClosed')} value="pollClosed" />}
                label="بسته‌شدن نظرسنجی"
              />
              <FormControlLabel
                control={<Checkbox checked={notifyNewMeetingOn} onChange={this.handleChangeOption('newMeeting')} value="newMeeting" />}
                label="ساخته‌شدن جلسه‌ی جدید"
              />
              <FormControlLabel
                control={<Checkbox checked={notifyCanceledMeetingOn} onChange={this.handleChangeOption('cancelMeeting')} value="cancelMeeting" />}
                label="لغوشدن جلسه"
              />
              <FormControlLabel
                control={<Checkbox checked={notifyMentionInCommentOn} onChange={this.handleChangeOption('mention')} value="mention" />}
                label="خطاب قرارگرفتن در نظرات"
              />
            </FormGroup>
            <FormHelperText>با هر تغییر، به‌طور آنی تنظیمات به‌روز می‌شوند</FormHelperText>
          </FormControl>
        </Card>
      );
    } else {
      return (
        <></>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  user: state.auth.userDetails,
  userId: state.auth.userId,
});

const mapDispatchToProps = {
  fetchUserDetails,
  modifyOption,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
