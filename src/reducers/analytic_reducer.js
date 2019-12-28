const PERFORMANCE_SUCCESS = 'PERFORMANCE_SUCCESS';
const METRICS_SUCCESS = 'METRICS_SUCCESS';

const initialState = {
  performance: {},
  metrics: {},
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case PERFORMANCE_SUCCESS:
      return { ...state, performance: action.performance };
    case METRICS_SUCCESS:
      return { ...state, metrics: action.metrics };
    default:
      return state;
  }
}
