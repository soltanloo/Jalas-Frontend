import { combineReducers } from 'redux';
import pollsReducer from './polls_reducer';
import selectedPollReducer from "./selected_poll_reducer";
import availableRoomsReducer from './rooms_reducer';

const rootReducer = combineReducers({
    polls: pollsReducer,
    selectedPoll: selectedPollReducer,
    availableRooms: availableRoomsReducer,
});

export default rootReducer;
