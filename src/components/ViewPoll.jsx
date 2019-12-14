import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPoll, vote } from '../actions/poll_actions';
import jMoment from "moment-jalaali";
import { TextField, Button } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import { justEnglishDigits, toEnglishDigits, toPersianDigits } from "../helpers/lang_helper";

class ViewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
    };
  }

  componentDidMount() {
    if(!this.props.curr || (this.props.curr.id !== this.props.match.params.id)) {
      this.props.fetchPoll(this.props.match.params.id);
    }
  }

  handleUserIdChange = (event) => {
    this.setState({ userId: justEnglishDigits(toEnglishDigits(event.target.value)) })
  };

  renderOptions = () => {
    return this.props.curr.options.map(option => {
      return (
        <Card key={'option-' + option.id} style={{
          width: 'auto',
          margin: 10
        }}>
          <CardContent>
            <Typography>
              زمان شروع: {toPersianDigits(jMoment(option.startTime, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jM/jD HH:mm'))}
            </Typography>
            <Typography>
              زمان پایان: {toPersianDigits(jMoment(option.finishTime, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jM/jD HH:mm'))}
            </Typography>
          </CardContent>
          <CardActions>
            <Button disabled={option.userList.some(userId => parseInt(userId) === parseInt(this.state.userId))} onClick={() => this.props.vote(option.id, this.props.curr.id, this.state.userId)} size="small">ثبت رأی</Button>
          </CardActions>
        </Card>
      );
    })
  };

  render() {
    if (!this.props.curr) {
      return <p>در حال بارگذاری...</p>
    }
    if (!this.props.curr.ongoing) {
      return <p>نظرسنجی غیرفعال است.</p>
    }
    return (
      <div style={{
        padding: 10
      }}>
        <h3>{this.props.curr.title}</h3>
        <TextField
          id="userId"
          label="شناسه کاربری رأی‌دهنده"
          value={toPersianDigits(this.state.userId)}
          onChange={this.handleUserIdChange}
        />
        <div style={{
          display: 'flex',
          flex: 'wrap'
        }}>
          {this.renderOptions()}
        </div>
      </div>
    )
  }
}

ViewPoll.propTypes = {
  curr: PropTypes.object.isRequired,
  fetchPoll: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  curr: state.currentPoll
});

const mapDispatchToProps = {
  fetchPoll,
  vote,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoll);
