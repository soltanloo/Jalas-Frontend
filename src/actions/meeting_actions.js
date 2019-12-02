import axios from 'axios';
import QS from 'querystring';
import { toast } from 'react-toastify';
const url = "http://localhost:8080/api";

export function createMeeting(roomId, from, to) {
  return dispatch => {
    axios.post(`${url}/meeting`,
      QS.stringify({ roomId, from, to })
    )
      .then(res => {
        toast.success('جلسه با موفقیت ثبت شد')
      })
      .catch(err => {
        toast.error('ثبت جلسه با خطا مواجه شد')
      })
  }
}

export function cancelMeeting(meetingId) {
  return dispatch => {
    axios.delete(`${url}/meeting/${meetingId}`
    )
      .then(res => {
        toast.success('جلسه با موفقیت لغو شد')
      })
      .catch(err => {
        toast.error('لغو جلسه با خطا مواجه شد')
      })
  }
}
