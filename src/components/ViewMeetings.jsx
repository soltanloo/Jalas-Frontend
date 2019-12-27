import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { fetchMeetings } from '../actions/meeting_actions';

class ViewMeetings extends Component {
  componentDidMount() {
    this.props.fetchMeetings();
  }

  render() {
    return (
      <List component="nav">
        {this.props.meetings && this.props.meetings.map((meeting) => (
          <ListItem button key={meeting.id} onClick={() => this.props.history.push(`/meeting/${meeting.id}`)}>
            <ListItemText primary={meeting.title} />
          </ListItem>
        ))}
      </List>
    );
  }
}

const mapStateToProps = (state) => ({
  meetings: state.meetings,
});

const mapDispatchToProps = {
  fetchMeetings,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(ViewMeetings);
