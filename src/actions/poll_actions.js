import axios from 'axios';
const url = "http://localhost:8080/api";
const FETCH_POLLS = "FETCH_POLLS";
const FETCH_POLL = "FETCH_POLL";


export function fetchPolls() {
  return dispatch => {
    axios.get(`${url}/poll`)
      .then(res => {
        dispatch({
          type: FETCH_POLLS,
          polls: res.data
        })
      })
  }
}

export function fetchPoll(id) {
  return dispatch => {
    axios.get(`${url}/poll/${id}`)
      .then(res => {
        dispatch({
          type: FETCH_POLL,
          poll: res.data
        })
      })
  }
}
