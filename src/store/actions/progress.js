import {
  differenceInCalendarDays as getDaysDiff,
  differenceInCalendarMonths as getMonthsDiff,
} from "date-fns"

import {
  SET_PROGRESS,
  SET_MINUTES_TODAY,
  SET_STREAK,
  SET_TASKS_TODAY,
  SET_BEST_STREAK,
  SET_OVERALL_MINUTES,
  SET_OVERALL_TASKS,
  SET_TODAY_CHART,
  SET_WEEK_CHART,
  SET_YEAR_CHART,
  SET_GOAL,
} from "../actions/actionTypes"
import {
  generateTodayChart,
  generateWeekChart,
  generateYearChart,
} from "../reducers/progress"
import { isNewDay, twoDaysPassed } from "../../libs/functions"

export const setProgress = progress => ({
  type: SET_PROGRESS,
  payload: progress,
})

const setMinutesToday = minutes => ({
  type: SET_MINUTES_TODAY,
  payload: minutes,
})

const setStreak = streak => ({
  type: SET_STREAK,
  payload: streak,
})

const setTasksToday = tasks => ({
  type: SET_TASKS_TODAY,
  payload: tasks,
})

const setBestStreak = streak => ({
  type: SET_BEST_STREAK,
  payload: streak,
})

const setOverallMinutes = minutes => ({
  type: SET_OVERALL_MINUTES,
  payload: minutes,
})

const setOverallTasks = tasks => ({
  type: SET_OVERALL_TASKS,
  payload: tasks,
})

const setTodayChart = chart => ({
  type: SET_TODAY_CHART,
  payload: chart,
})

const setWeekChart = chart => ({
  type: SET_WEEK_CHART,
  payload: chart,
})

const setYearChart = chart => ({
  type: SET_YEAR_CHART,
  payload: chart,
})

export const setGoal = goal => ({
  type: SET_GOAL,
  payload: goal,
})

export const refreshTodayProgress = () => (dispatch, getState) => {
  const { lastUpdate } = getState().progress

  if (isNewDay(lastUpdate)) {
    setMinutesToday(0)
    setTasksToday(0)
  }
}

export const refreshStreak = () => (dispatch, getState) => {
  const { lastUpdate } = getState().progress

  if (lastUpdate && twoDaysPassed(lastUpdate)) {
    dispatch(setStreak(0))
  }
}

export const refreshCharts = () => dispatch => {
  dispatch(refreshTodayChart())
  dispatch(refreshWeekChart())
  dispatch(refreshYearChart())
}

export const refreshTodayChart = () => (dispatch, getState) => {
  const { lastUpdate } = getState().progress

  if (isNewDay(lastUpdate)) {
    dispatch(setTodayChart(generateTodayChart()))
  }
}

export const refreshWeekChart = () => (dispatch, getState) => {
  const { lastUpdate, weekChart } = getState().progress

  const newChart = generateWeekChart()
  const newChartDays = Object.keys(newChart)

  const lastInsertIndex = 6 - getDaysDiff(new Date(), new Date(lastUpdate))
  if (lastInsertIndex < 0) {
    dispatch(setWeekChart(newChart))
    return
  }

  const recentRecords = Object.values(weekChart)
    .reverse()
    .filter((_, i) => i <= lastInsertIndex)

  let newRecords = Object.values(newChart)
  for (let r = lastInsertIndex, i = 0; r >= 0; r--, i++) {
    newRecords[r] = recentRecords[i]
  }

  newChartDays.forEach((day, i) => {
    newChart[day] = newRecords[i]
  })

  dispatch(setWeekChart(newChart))
}

export const refreshYearChart = () => (dispatch, getState) => {
  const { lastUpdate, yearChart } = getState().progress

  const newChart = generateYearChart()
  const newChartMonths = Object.keys(newChart)

  const lastInsertIndex = 11 - getMonthsDiff(new Date(), new Date(lastUpdate))
  if (lastInsertIndex < 0) {
    dispatch(setYearChart(newChart))
    return
  }

  const recentRecords = Object.values(yearChart)
    .reverse()
    .filter((_, i) => i <= lastInsertIndex)

  let newRecords = Object.values(newChart)
  for (let r = lastInsertIndex, i = 0; r >= 0; r--, i++) {
    newRecords[r] = recentRecords[i]
  }

  newChartMonths.forEach((month, i) => {
    newChart[month] = newRecords[i]
  })

  dispatch(setYearChart(newChart))
}

export const incrementMinutes = () => (dispatch, getState) => {
  const {
    goal,
    overallMinutes,
    today: { minutes, streakChecked },
  } = getState().progress
  const {
    configuration: { workSessionDuration },
  } = getState().sessions

  dispatch(setOverallMinutes(overallMinutes + workSessionDuration))
  dispatch(setMinutesToday(minutes + workSessionDuration))

  if (minutes + workSessionDuration >= goal && !streakChecked) {
    dispatch(incrementStreak())
  }
}

export const incrementTasksToday = () => (dispatch, getState) => {
  const {
    today: { tasks },
  } = getState().progress

  dispatch(setTasksToday(tasks + 1))
}

export const incrementStreak = () => (dispatch, getState) => {
  const { streak, bestStreak } = getState().progress

  const newStreak = streak + 1

  dispatch(setStreak(newStreak))

  if (newStreak > bestStreak) {
    dispatch(setBestStreak(newStreak))
  }
}

export const incrementOverallTasks = () => (dispatch, getState) => {
  const { overallTasks } = getState().progress

  dispatch(setOverallTasks(overallTasks + 1))
}

export const updateCharts = () => dispatch => {
  dispatch(updateTodayChart())
  dispatch(updateWeekChart())
  dispatch(updateYearChart())
}

const updateTodayChart = () => (dispatch, getState) => {
  const { todayChart } = getState().progress
  const {
    configuration: { workSessionDuration },
  } = getState().sessions

  const hoursNow = new Date().getHours()
  const newChart = todayChart

  for (let period of Object.keys(todayChart)) {
    const hourStr = period.split(":", 1)[0]
    const hour = hourStr.startsWith("0") ? +hourStr[1] : +hourStr

    if (hoursNow - 1 === hour || hoursNow + 1 === hour || hoursNow === hour) {
      newChart[period] += workSessionDuration
    }
  }

  dispatch(setTodayChart(newChart))
}

const updateWeekChart = () => (dispatch, getState) => {
  const { weekChart } = getState().progress
  const {
    configuration: { workSessionDuration },
  } = getState().sessions

  const weekdays = Object.keys(weekChart)
  const now = weekdays[weekdays.length - 1]

  const updatedChart = {
    ...weekChart,
    [now]: weekChart[now] + workSessionDuration,
  }

  dispatch(setWeekChart(updatedChart))
}

const updateYearChart = () => (dispatch, getState) => {
  const { yearChart } = getState().progress
  const {
    configuration: { workSessionDuration },
  } = getState().sessions

  const months = Object.keys(yearChart)
  const now = months[months.length - 1]

  const updatedChart = {
    ...yearChart,
    [now]: yearChart[now] + workSessionDuration,
  }

  dispatch(setYearChart(updatedChart))
}

export const parseServerData = data => ({
  ...data,
  todayChart: JSON.parse(data.todayChart),
  weekChart: JSON.parse(data.weekChart),
  yearChart: JSON.parse(data.yearChart),
})
