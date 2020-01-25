import axios from 'axios';
import { toast } from "react-toastify";
const url = "http://194.5.193.107:40704/Jalas-Backend/api";
const FETCH_AVAILABLE_ROOMS = "FETCH_AVAILABLE_ROOMS";


export function fetchAvailableRooms(from, to) {
  return dispatch => {
    axios.get(`${url}/room?startTime=${from}&endTime=${to}`)
      .then(res => {
        dispatch({
          type: FETCH_AVAILABLE_ROOMS,
          availableRooms: res.data
        })
      })
      .catch(err => {
        toast.error('دریافت اتاق‌ها با خطا مواجه شد. مجدداً تلاش کنید.')
      })
  }
}
