import axios from 'axios';
import { toast } from 'react-toastify';
import Config from '../config/config';

const MODIFY_REQUEST = 'MODIFY_REQUEST';
const MODIFY_FAILURE = 'MODIFY_FAILURE';
const MODIFY_SUCCESS = 'MODIFY_SUCCESS';

export function modifyOption(optionName, isSet, cb) {
  return (dispatch) => {
    axios.post(`${Config.baseURL}/notification/${optionName}?notifyOn=${isSet}`, { notifyOn: isSet })
      .then((res) => {
        cb();
        toast.success('تغییر با موفقیت انجام شد');
      })
      .catch((err) => {
        toast.error('انجام تغییر با خطا مواجه شد');
      });
  };
}
