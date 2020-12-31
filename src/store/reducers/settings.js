import {
  SET_LONG_BREAK_DURATION,
  SET_SMALL_BREAK_DURATION,
  SET_WORK_SESSION_DURATION,
} from "../actions/actionTypes";

const initialState = {
  workSessionDuration: 25, // in minutes
  smallBreakDuration: 5,
  longBreakDuration: 15,
};

const handlers = {
  [SET_WORK_SESSION_DURATION]: (state, { payload }) => ({
    ...state,
    workSessionDuration: payload,
  }),
  [SET_SMALL_BREAK_DURATION]: (state, { payload }) => ({
    ...state,
    smallBreakDuration: payload,
  }),
  [SET_LONG_BREAK_DURATION]: (state, { payload }) => ({
    ...state,
    longBreakDuration: payload,
  }),
  DEFAULT: state => state,
};

export function settingsReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
}
