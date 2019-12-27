const FETCH_MEETINGS = "FETCH_MEETINGS"

export default function (state = [], action = {}) {
  switch (action.type) {
    case FETCH_MEETINGS:
      return action.meetings;
    default:
      return state;
  }
}
