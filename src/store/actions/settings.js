import {
  SET_LONG_BREAK_DURATION,
  SET_SMALL_BREAK_DURATION,
  SET_WORK_SESSION_DURATION,
} from "./actionTypes";

export const setWorkSessionDuration = duration => ({
  type: SET_WORK_SESSION_DURATION,
  payload: duration,
});

export const setSmallBreakDuration = duration => ({
  type: SET_SMALL_BREAK_DURATION,
  payload: duration,
});

export const setLongBreakDuration = duration => ({
  type: SET_LONG_BREAK_DURATION,
  payload: duration,
});
