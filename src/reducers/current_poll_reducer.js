const FETCH_POLL = "FETCH_POLL";

export default function (state = {}, action = {}) {
  switch (action.type) {
    case FETCH_POLL:
      return action.poll;
    default:
      return state;
  }
}
