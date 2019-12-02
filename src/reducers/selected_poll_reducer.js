const FETCH_POLL = "FETCH_POLL";

export default function (state = null, action = {}) {
  switch (action.type) {
    case FETCH_POLL:
      return action.poll;
    default:
      return state;
  }
}
