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

export const generateTodayChart = () => ({
  "06:00": 0,
  "09:00": 0,
  "12:00": 0,
  "15:00": 0,
  "18:00": 0,
  "21:00": 0,
  "00:00": 0,
})

export const generateWeekChart = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  let offset = weekdays.length - 1
  const minutesWeekChartDays = weekdays.map((_, i) => {
    let day = weekdays[new Date().getDay() - i]

    if (day === undefined) {
      day = weekdays[offset]
      offset--
    }

    return day
  })

  let minutesWeekChart = {}
  minutesWeekChartDays.reverse().forEach(day => {
    minutesWeekChart[day] = 0
  })

  return minutesWeekChart
}

export const generateYearChart = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  let offset = months.length - 1
  const minutesYearChartDays = months.map((v, i) => {
    let month = months[new Date().getMonth() - i]

    if (month === undefined) {
      month = months[offset]
      offset--
    }

    return month
  })

  let minutesYearChart = {}
  minutesYearChartDays.reverse().forEach(month => {
    minutesYearChart[month] = 0
  })

  return minutesYearChart
}

/**
 * @property {number|null} lastUpdate - Timestamp of the last tasks/minutes update
 * @property {number} streak - Current streak (days when at least one work session is completed)
 * @property {number} bestStreak - The best streak
 * @property {number} overallMinutes - Focused minutes in total
 * @property {number} overallTasks - Completed tasks in total
 *
 * @property {{[string]: number}} minutesTodayChart - {"$hh:00": Focused minutes for the $hh period}
 * @property {{[string]: number}} minutesWeekChart - {"$dayOfTheWeek": Focused minutes for the $dayOfTheWeek}
 * @property {{[string]: number}} minutesTodayChart - {"$month": Focused minutes for the $month}
 */
const initialState = {
  lastUpdate: null,
  goal: 60,
  streak: 0,
  today: {
    minutes: 0,
    tasks: 0,
    streakChecked: false,
  },
  bestStreak: 0,
  overallMinutes: 0,
  overallTasks: 0,

  todayChart: generateTodayChart(),
  weekChart: generateWeekChart(),
  yearChart: generateYearChart(),
}

const handlers = {
  [SET_PROGRESS]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_MINUTES_TODAY]: (state, { payload: minutes }) => ({
    ...state,
    lastUpdate: Date.now(),
    today: {
      ...state.today,
      minutes,
    },
  }),
  [SET_TASKS_TODAY]: (state, { payload: tasks }) => ({
    ...state,
    lastUpdate: Date.now(),
    today: {
      ...state.today,
      tasks,
    },
  }),
  [SET_STREAK]: (state, { payload: streak }) => ({
    ...state,
    streak,
    today: {
      ...state.today,
      streakChecked: true,
    },
  }),
  [SET_BEST_STREAK]: (state, { payload: bestStreak }) => ({
    ...state,
    bestStreak,
  }),
  [SET_OVERALL_MINUTES]: (state, { payload: overallMinutes }) => ({
    ...state,
    overallMinutes,
  }),
  [SET_OVERALL_TASKS]: (state, { payload: overallTasks }) => ({
    ...state,
    overallTasks,
  }),
  [SET_TODAY_CHART]: (state, { payload: todayChart }) => ({
    ...state,
    todayChart,
  }),
  [SET_WEEK_CHART]: (state, { payload: weekChart }) => ({
    ...state,
    weekChart,
  }),
  [SET_YEAR_CHART]: (state, { payload: yearChart }) => ({
    ...state,
    yearChart,
  }),
  [SET_GOAL]: (state, { payload: goal }) => ({
    ...state,
    goal,
  }),
  DEFAULT: state => state,
}

export function progressReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
