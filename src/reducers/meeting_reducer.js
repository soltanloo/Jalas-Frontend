const CREATE_MEETING_SUCCESS = "CREATE_MEETING_SUCCESS";

export default function (state = null, action = {}) {
  switch (action.type) {
    case CREATE_MEETING_SUCCESS:
      return action.meeting;
    default:
      return state;
  }
}
