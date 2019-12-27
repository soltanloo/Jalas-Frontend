import axios from 'axios';
import { toast } from 'react-toastify';
import Config from '../config/config';

const CREATE_MEETING_SUCCESS = 'CREATE_MEETING_SUCCESS';
const FETCH_MEETING = 'FETCH_MEETING';
const FETCH_MEETINGS = 'FETCH_MEETINGS';

export function createMeeting(roomId, from, to, pollId) {
  return (dispatch) => {
    axios.post(`${Config.baseURL}/addMeeting`,
      {
        roomNumber: roomId, startTime: from, finishTime: to, pollId,
      })
      .then((res) => {
        toast.success('جلسه با موفقیت ثبت شد');
        dispatch({
          type: CREATE_MEETING_SUCCESS,
          meeting: res.data,
        });
      })
      .catch((err) => {
        toast.error('ثبت جلسه با خطا مواجه شد');
      });
  };
}

export function fetchMeeting(id) {
  return (dispatch) => {
    axios.get(`${Config.baseURL}/meeting/${id}`)
      .then((res) => {
        dispatch({
          type: FETCH_MEETING,
          meeting: res.data,
        });
      });
  };
}

export function fetchMeetings() {
  return (dispatch) => {
    axios.get(`${Config.baseURL}/meeting/`)
      .then((res) => {
        dispatch({
          type: FETCH_MEETINGS,
          meetings: res.data,
        });
      });
  };
}

export function cancelMeeting(meetingId) {
  return (dispatch) => {
    axios.post(`${Config.baseURL}/meeting/${meetingId}/cancel`)
      .then((res) => {
        toast.success('جلسه با موفقیت لغو شد');
      })
      .catch((err) => {
        toast.error('لغو جلسه با خطا مواجه شد');
      });
  };
}
