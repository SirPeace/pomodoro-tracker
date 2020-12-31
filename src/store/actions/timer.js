import { getTimeFromMs } from "../../libs/functions";
import {
  UPDATE_DURATION,
  SET_STATUS,
  SET_TIMER_UPDATE_INTERVAL,
  SET_TIMER_STOP_TIMEOUT,
  UPDATE_RUNNING_DATA,
  SET_TIME,
} from "./actionTypes";

/**
 * @param {string} time
 */
export const setTime = time => ({
  type: SET_TIME,
  payload: time,
});

/**
 * @param {number} duration (in milliseconds)
 */
export const udpateDuration = duration => ({
  type: UPDATE_DURATION,
  payload: duration,
});

export const setTimerUpdateInterval = interval => ({
  type: SET_TIMER_UPDATE_INTERVAL,
  payload: interval,
});

export const setTimerStopTimeout = timeout => {
  return {
    type: SET_TIMER_STOP_TIMEOUT,
    payload: timeout,
  };
};

export const setStatus = status => ({
  type: SET_STATUS,
  payload: status,
});

export const updateRunningData = ({ checkpoint, passed }) => {
  const payload = {};

  if (checkpoint !== undefined) payload.checkpoint = checkpoint;
  if (passed !== undefined) {
    payload.passed = passed;
  }

  return {
    type: UPDATE_RUNNING_DATA,
    payload,
  };
};

export const setCheckpoint = () => dispatch => {
  dispatch(
    updateRunningData({
      checkpoint: performance.now(),
    })
  );
};

export const setRunningTime = () => (dispatch, getState) => {
  const {
    running: { checkpoint, passed },
  } = getState().timer;

  // console.log(
  //   "Time passed: ",
  //   checkpoint > 0 ? performance.now() - checkpoint + passed : 0
  // );

  dispatch(
    updateRunningData({
      passed: checkpoint > 0 ? performance.now() - checkpoint + passed : 0,
    })
  );
};

export const updateTime = time => dispatch => {
  let [minutes, seconds] = time.split(":", 2);

  minutes = minutes.startsWith("0") ? +minutes[1] : +minutes;
  seconds = seconds.startsWith("0") ? +seconds[1] : +seconds;

  if (seconds === 0) {
    seconds = 59;
    minutes--;
  } else {
    seconds--;
  }

  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  time = `${minutes}:${seconds}`;

  dispatch(setTime(time));
};

export const resetTimer = () => (dispatch, getState) => {
  const { duration, timerStopTimeout, timerUpdateInterval } = getState().timer;

  clearTimeout(timerStopTimeout);
  clearInterval(timerUpdateInterval);
  cancelAnimationFrame(window.animationID);

  dispatch(setTimerStopTimeout(null));
  dispatch(setTimerUpdateInterval(null));
  dispatch(updateRunningData({ passed: 0, checkpoint: 0 }));
  dispatch(setTime(getTimeFromMs(duration)));
};

export const startTimer = () => (dispatch, getState) => {
  const { running, duration } = getState().timer;

  dispatch(setCheckpoint());
  dispatch(setStatus("running"));

  // Setting timeout for stopping the timer
  const timeout = window.setTimeout(() => {
    dispatch(stopTimer(false));
  }, duration - running.passed);

  // Setting interval for updating time
  const interval = window.setInterval(() => {
    dispatch(updateTime(getState().timer.time)); // New state time on each interval
  }, 1000);

  dispatch(setTimerStopTimeout(timeout));
  dispatch(setTimerUpdateInterval(interval));
};

export const pauseTimer = () => (dispatch, getState) => {
  const { timerStopTimeout, timerUpdateInterval, running } = getState().timer;

  const pause = () => {
    dispatch(setRunningTime(running.checkpoint));
    dispatch(setCheckpoint());

    clearTimeout(timerStopTimeout);
    clearInterval(timerUpdateInterval);
    cancelAnimationFrame(window.animationID);

    dispatch(setTimerStopTimeout(null));
    dispatch(setTimerUpdateInterval(null));
    dispatch(setStatus("paused"));
  };

  if (timerUpdateInterval === null) setTimeout(pause);
  else pause();
};

export const resumeTimer = () => (dispatch, getState) => {
  const { running, duration } = getState().timer;

  dispatch(setCheckpoint());
  dispatch(setStatus("running"));

  // Setting timeout for stopping the timer
  const timeout = window.setTimeout(() => {
    dispatch(stopTimer(false));
  }, duration - running.passed);

  dispatch(setTimerStopTimeout(timeout));

  // Setting interval for updating time
  const interval = window.setInterval(() => {
    dispatch(updateTime(getState().timer.time));
  }, 1000);

  dispatch(setTimerUpdateInterval(interval));
};

export const stopTimer = (forced = true) => dispatch => {
  cancelAnimationFrame(window.animationID);
  dispatch(resetTimer());

  if (forced) {
    dispatch(setStatus("static"));
  } else {
    dispatch(setStatus("finished"));
  }
};
