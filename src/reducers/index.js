import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import pollsReducer from './polls_reducer';
import availableRoomsReducer from './rooms_reducer';
import meetingReducer from './meeting_reducer';
import currentMeetingReducer from './current_meeting_reducer';
import currentPollReducer from './current_poll_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  polls: pollsReducer,
  currentPoll: currentPollReducer,
  availableRooms: availableRoomsReducer,
  meeting: meetingReducer,
  currentMeeting: currentMeetingReducer,
  auth: authReducer,
});

export default rootReducer;
