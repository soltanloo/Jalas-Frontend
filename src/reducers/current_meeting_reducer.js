const FETCH_MEETING = "FETCH_MEETING";

export default function (state = {}, action = {}) {
  switch (action.type) {
    case FETCH_MEETING:
      return action.meeting;
    default:
      return state;
  }
}
