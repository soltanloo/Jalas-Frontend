import { combineReducers } from 'redux';
import pollsReducer from './polls_reducer';
import availableRoomsReducer from './rooms_reducer';
import meetingReducer from './meeting_reducer';
import currentMeetingReducer from "./current_meeting_reducer";
import currentPollReducer from "./current_poll_reducer";

const rootReducer = combineReducers({
    polls: pollsReducer,
    currentPoll: currentPollReducer,
    availableRooms: availableRoomsReducer,
    meeting: meetingReducer,
    currentMeeting: currentMeetingReducer,
});

export default rootReducer;
