import {
  SET_DURATION,
  SET_STATUS,
  SET_TIMER_STOP_TIMEOUT,
  SET_ANIMATION_ID,
  SET_TIMER_UPDATE_INTERVAL,
  SET_TIME,
  UPDATE_RUNNING_DATA,
} from "../actions/actionTypes"

/**
 * @property {string} status "static"|"running"|"paused"|"finished"
 * @property {object} time - Left time: "mm:ss"
 * @property {number} duration (in milliseconds) - How long should timer run
 * @property {object} running - How much time did timer run: {checkpoint, passed} (in milliseconds)
 * @property {Interval} timerUpdateInterval - Interval, that updates the time
 * @property {Timeout} timerStopTimeout - Timeout in which timer stops
 */
const initialState = {
  status: "static",
  time: "00:00",
  duration: 0,

  running: {
    checkpoint: 0, // timestamp for timer start/resume
    passed: 0,
  },

  timerUpdateInterval: null,
  timerStopTimeout: null,
}

const handlers = {
  [SET_DURATION]: (state, { payload }) => ({
    ...state,
    duration: payload,
  }),
  [SET_STATUS]: (state, { payload }) => ({
    ...state,
    status: payload,
  }),
  [SET_TIME]: (state, { payload }) => ({
    ...state,
    time: payload,
  }),
  [SET_TIMER_UPDATE_INTERVAL]: (state, { payload }) => ({
    ...state,
    timerUpdateInterval: payload,
  }),
  [SET_TIMER_STOP_TIMEOUT]: (state, { payload }) => ({
    ...state,
    timerStopTimeout: payload,
  }),
  [SET_ANIMATION_ID]: (state, { payload }) => ({
    ...state,
    animationID: payload,
  }),
  [UPDATE_RUNNING_DATA]: (state, { payload }) => ({
    ...state,
    running: {
      ...state.running,
      ...payload,
    },
  }),
  DEFAULT: state => state,
}

export function timerReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
