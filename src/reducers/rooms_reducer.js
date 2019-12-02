const FETCH_AVAILABLE_ROOMS = "FETCH_AVAILABLE_ROOMS";

export default function (state = [], action = {}) {
  switch (action.type) {
    case FETCH_AVAILABLE_ROOMS:
      return action.availableRooms;
    default:
      return state;
  }
}
