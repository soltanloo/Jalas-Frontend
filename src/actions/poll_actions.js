import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:8080/api';
const FETCH_POLLS = 'FETCH_POLLS';
const FETCH_POLL = 'FETCH_POLL';


export function fetchPolls() {
  return (dispatch) => {
    axios.get(`${url}/poll`)
      .then((res) => {
        dispatch({
          type: FETCH_POLLS,
          polls: res.data,
        });
      });
  };
}

export function fetchPoll(id) {
  return (dispatch) => {
    axios.get(`${url}/poll/${id}`)
      .then((res) => {
        dispatch({
          type: FETCH_POLL,
          poll: res.data,
        });
      });
  };
}

export function createPoll(data) {
  return (dispatch) => axios.post(`${url}/poll`, data)
    .then((res) => {
      toast.success('نظرسنجی با موفقیت ایجاد شد');
      return res;
    })
    .catch((err) => {
      toast.error('ایجاد نظرسنجی با خطا مواجه شد');
    });
}

export function inviteToPoll(userEmail, pollId, userId) {
  return (dispatch) => {
    axios.post(`${url}/poll/addParticipant`,
      { userEmail, pollId, userId })
      .then((res) => {
        toast.success('کاربر با موفقیت به نظرسنجی دعوت شد');
      })
      .catch((err) => {
        toast.error('خطایی در دعوت کاربر به نظرسنجی رخ داده است');
      });
  };
}

export function removeFromPoll(userEmail, pollId, userId) {
  return (dispatch) => {
    axios.post(`${url}/poll/removeParticipant`,
      { userEmail, pollId, userId })
      .then((res) => {
        toast.success('کاربر با موفقیت لغو دعوت شد');
      })
      .catch((err) => {
        toast.error('خطایی در لغو دعوت کاربر به نظرسنجی رخ داده است');
      });
  };
}

export function addOption(pollId, userId, startTime, finishTime, cb) {
  return (dispatch) => {
    axios.post(`${url}/poll/addOption`,
      { startTime, finishTime, userId, pollId })
      .then((res) => {
        cb();
        toast.success('گزینه با موفقیت به نظرسنجی اضافه شد');
      })
      .catch((err) => {
        toast.error('خطایی در افزودن گزینه به نظرسنجی رخ داده است');
      });
  };
}

export function removeOption(pollId, userId, optionId, cb) {
  return (dispatch) => {
    axios.post(`${url}/poll/removeOption`,
      { optionId, userId, pollId })
      .then((res) => {
        cb();
        toast.success('گزینه با موفقیت از نظرسنجی حذف شد');
      })
      .catch((err) => {
        toast.error('خطایی در حذف گزینه از نظرسنجی رخ داده است');
      });
  };
}

export function vote(optionId, pollId, userId) {
  return (dispatch) => {
    axios.post(`${url}/vote`,
      { optionId, pollId, userId })
      .then((res) => {
        dispatch(fetchPoll(pollId));
        toast.success('رأی با موفقیت ثبت شد');
      })
      .catch((err) => {
        toast.error('ثبت رأی با خطا مواجه شد');
      });
  };
}
