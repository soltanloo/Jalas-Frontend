import axios from 'axios';
import { toast } from 'react-toastify';
import Config from '../config/config';

const PERFORMANCE_REQUEST = 'PERFORMANCE_REQUEST';
const METRICS_REQUEST = 'METRICS_REQUEST';
const PERFORMANCE_SUCCESS = 'PERFORMANCE_SUCCESS';
const METRICS_SUCCESS = 'METRICS_SUCCESS';

export function fetchPerformance() {
  return (dispatch) => {
    dispatch({ type: PERFORMANCE_REQUEST });

    axios.get(`${Config.baseURL}/performance`).then((res) => {
      dispatch({
        type: PERFORMANCE_SUCCESS,
        performance: res.data,
      });
    }).catch((error) => {
      toast.error('دریافت اطلاعات با خطا مواجه شد');
    });
  };
}

export function fetchMetrics() {
  return (dispatch) => {
    dispatch({ type: METRICS_REQUEST });

    axios.get(`${Config.baseURL}/metrics`).then((res) => {
      dispatch({
        type: METRICS_SUCCESS,
        metrics: res.data,
      });
    }).catch((error) => {
      toast.error('دریافت اطلاعات با خطا مواجه شد');
    });
  };
}
