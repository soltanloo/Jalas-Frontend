import { combineReducers } from 'redux';
import pollsReducer from './polls_reducer';
import selectedPollReducer from "./selected_poll_reducer";
import availableRoomsReducer from './rooms_reducer';
import meetingReducer from './meeting_reducer';

const rootReducer = combineReducers({
    polls: pollsReducer,
    selectedPoll: selectedPollReducer,
    availableRooms: availableRoomsReducer,
    meeting: meetingReducer,
});

export default rootReducer;
