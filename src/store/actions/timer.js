import { getTimeString, throwNotification, toMs } from "../../libs/functions"
import { uploadUserState } from "../db"
import {
  SET_DURATION,
  SET_STATUS,
  SET_TIMER_UPDATE_INTERVAL,
  SET_TIMER_STOP_TIMEOUT,
  UPDATE_RUNNING_DATA,
  SET_TIME,
} from "./actionTypes"
import { incrementMinutes, updateCharts } from "./progress"
import { pushSessionOrder } from "./sessions"

export const setTime = (value, unit = "time") => ({
  type: SET_TIME,
  payload: getTimeString(value, unit),
})

export const setDuration = (value, unit) => ({
  type: SET_DURATION,
  payload: toMs(value, unit),
})

export const setTimerUpdateInterval = interval => ({
  type: SET_TIMER_UPDATE_INTERVAL,
  payload: interval,
})

export const setTimerStopTimeout = timeout => {
  return {
    type: SET_TIMER_STOP_TIMEOUT,
    payload: timeout,
  }
}

export const setStatus = status => ({
  type: SET_STATUS,
  payload: status,
})

export const updateRunningData = ({ checkpoint, passed }) => {
  const payload = {}

  if (checkpoint !== undefined) payload.checkpoint = checkpoint
  if (passed !== undefined) payload.passed = passed

  return {
    type: UPDATE_RUNNING_DATA,
    payload,
  }
}

export const setCheckpoint = () => dispatch => {
  dispatch(
    updateRunningData({
      checkpoint: performance.now(),
    })
  )
}

export const setRunningTime = () => (dispatch, getState) => {
  const {
    running: { checkpoint, passed },
  } = getState().timer

  dispatch(
    updateRunningData({
      passed: checkpoint > 0 ? performance.now() - checkpoint + passed : 0,
    })
  )
}

export const updateTime = time => dispatch => {
  let [minutes, seconds] = time.split(":", 2)

  minutes = minutes.startsWith("0") ? +minutes[1] : +minutes
  seconds = seconds.startsWith("0") ? +seconds[1] : +seconds

  if (seconds === 0) {
    seconds = 59
    minutes--
  } else {
    seconds--
  }

  if (minutes < 10) minutes = "0" + minutes
  if (seconds < 10) seconds = "0" + seconds

  time = `${minutes}:${seconds}`

  dispatch(setTime(time))
}

export const resetTimer = () => (dispatch, getState) => {
  const { duration, timerStopTimeout, timerUpdateInterval } = getState().timer

  clearTimeout(timerStopTimeout)
  clearInterval(timerUpdateInterval)

  dispatch(setTimerStopTimeout(null))
  dispatch(setTimerUpdateInterval(null))
  dispatch(updateRunningData({ passed: 0, checkpoint: 0 }))
  dispatch(setTime(getTimeString(duration)))
}

export const startTimer = () => (dispatch, getState) => {
  const { running, duration } = getState().timer

  dispatch(setCheckpoint())
  dispatch(setStatus("running"))

  // Setting timeout for stopping the timer
  const timeout = setTimeout(() => {
    dispatch(stopTimer(false))
  }, duration - running.passed)

  dispatch(setTimerStopTimeout(timeout))

  let updateTimeDelay = running.passed === 0 ? 1000 : running.passed % 1000

  setTimeout(() => {
    dispatch(updateTime(getState().timer.time))

    // Setting interval for updating time
    const interval = window.setInterval(() => {
      dispatch(updateTime(getState().timer.time)) // New state time on each interval
    }, 1000)

    dispatch(setTimerUpdateInterval(interval))
  }, updateTimeDelay)
}

export const pauseTimer = () => (dispatch, getState) => {
  const { timerStopTimeout, timerUpdateInterval, running } = getState().timer

  const pause = () => {
    dispatch(setRunningTime(running.checkpoint))
    dispatch(setCheckpoint())

    clearTimeout(timerStopTimeout)
    clearInterval(timerUpdateInterval)

    dispatch(setTimerStopTimeout(null))
    dispatch(setTimerUpdateInterval(null))
    dispatch(setStatus("paused"))
  }

  if (timerUpdateInterval === null) setTimeout(pause)
  else pause()
}

export const resumeTimer = () => (dispatch, getState) => {
  const { running, duration } = getState().timer

  dispatch(setCheckpoint())
  dispatch(setStatus("running"))

  // Setting timeout for stopping the timer
  const timeout = window.setTimeout(() => {
    dispatch(stopTimer(false))
  }, duration - running.passed)

  dispatch(setTimerStopTimeout(timeout))

  setTimeout(
    () => {
      if (duration - running.passed > 1000) {
        dispatch(updateTime(getState().timer.time))

        const interval = window.setInterval(() => {
          dispatch(updateTime(getState().timer.time)) // New state time on each interval
        }, 1000)

        dispatch(setTimerUpdateInterval(interval))
      }
    },
    running.passed === 0 ? 1000 : running.passed % 1000
  )
}

export const stopTimer = (forced = true) => (dispatch, getState) => {
  dispatch(resetTimer())

  if (forced) {
    dispatch(setStatus("static"))
  } else {
    dispatch(pushSessionOrder())

    dispatch(setStatus("finished"))

    const session = getState().sessions.session

    if (session === "work_session") {
      throwNotification(
        "The break is over",
        "Getting back to work. Let's get things done!"
      )
    } else if (session.includes("break")) {
      throwNotification(
        "The work session is over",
        "Good job! Now take some time to refresh."
      )

      dispatch(updateCharts())
      dispatch(incrementMinutes())

      setTimeout(() => dispatch(uploadUserState()))
    }
  }
}
