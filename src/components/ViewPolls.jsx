import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { fetchPolls } from '../actions/poll_actions';

class ViewPolls extends Component {
  componentDidMount() {
    this.props.fetchPolls();
  }

  render() {
    return (
      <>
        <Typography align={'center'} variant={'h5'} gutterBottom>
          نظرسنجی‌های من
        </Typography>
        <List component="nav">
          {this.props.polls && this.props.polls.map((poll) => (
            <ListItem button key={poll.id} onClick={() => this.props.history.push(`/poll/${poll.id}`)}>
              <ListItemText primary={poll.title} />
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  polls: state.polls,
});

const mapDispatchToProps = {
  fetchPolls,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(ViewPolls);
