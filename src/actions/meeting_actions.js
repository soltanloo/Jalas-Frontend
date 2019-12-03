import axios from 'axios';
import { toast } from 'react-toastify';
const url = "http://localhost:8080/api";
const CREATE_MEETING_SUCCESS = "CREATE_MEETING_SUCCESS";

export function createMeeting(roomId, from, to) {
  return dispatch => {
    axios.post(`${url}/meeting`,
      { roomNumber: roomId, startTime: from, finishTime: to }
    )
      .then(res => {
        toast.success('جلسه با موفقیت ثبت شد');
        dispatch({
          type: CREATE_MEETING_SUCCESS,
          meeting: res.data,
        })
      })
      .catch(err => {
        toast.warn(err);
      })
  }
}

export function cancelMeeting(meetingId) {
  return dispatch => {
    axios.delete(`${url}/meeting/${meetingId}/cancel`
    )
      .then(res => {
        toast.success('جلسه با موفقیت لغو شد')
      })
      .catch(err => {
        toast.error('لغو جلسه با خطا مواجه شد')
      })
  }
}
