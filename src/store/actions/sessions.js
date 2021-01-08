import {
  SET_CONFIGURATION,
  SET_CURRENT_SESSION,
  SET_SESSION_LOOP,
} from "./actionTypes";

export const setConfiguration = config => {
  const payload = {};

  if (+config.longBreakDuration) {
    payload.longBreakDuration = +config.longBreakDuration;
  }
  if (+config.shortBreakDuration) {
    payload.shortBreakDuration = +config.shortBreakDuration;
  }
  if (+config.workSessionsCountBeforeLongBreak) {
    payload.workSessionsCountBeforeLongBreak = +config.workSessionsCountBeforeLongBreak;
  }
  if (+config.workSessionDuration) {
    payload.workSessionDuration = +config.workSessionDuration;
  }

  return {
    type: SET_CONFIGURATION,
    payload,
  };
};

export const pushSessionOrder = () => (dispatch, getState) => {
  let { order, current, loop } = getState().sessions;

  if (order[current + 1] === undefined) {
    current = 0;
    loop += 1;
  } else {
    current += 1;
  }

  dispatch(setCurrentSession(current));
  dispatch(setSessionLoop(loop));
};

export const setCurrentSession = current => ({
  type: SET_CURRENT_SESSION,
  payload: current,
});

export const setSessionLoop = loop => ({
  type: SET_SESSION_LOOP,
  payload: loop,
});

export const resetSessionOrder = () => dispatch => {
  dispatch(setCurrentSession(0));
  dispatch(setSessionLoop(1));
};
