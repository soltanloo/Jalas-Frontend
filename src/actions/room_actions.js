import axios from 'axios';
const url = "http://localhost:8080/api";
const FETCH_AVAILABLE_ROOMS = "FETCH_AVAILABLE_ROOMS";


export function fetchAvailableRooms(from, to) {
  return dispatch => {
    axios.get(`${url}/available-rooms?startTime=${from}&endTime=${to}`)
      .then(res => {
        dispatch({
          type: FETCH_AVAILABLE_ROOMS,
          availableRooms: res.data
        })
      })
  }
}
