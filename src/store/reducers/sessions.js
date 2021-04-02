import {
  SET_CURRENT_SESSION,
  SET_CONFIGURATION,
  SET_SESSION_LOOP,
} from "../actions/actionTypes"

const defaultConfiguration = {
  workSessionDuration: 25, // minutes
  shortBreakDuration: 5, // minutes
  longBreakDuration: 15, // minutes
  workSessionsCountBeforeLongBreak: 4,
}

let configuration = defaultConfiguration
if (localStorage.getItem("sessions.configuration")) {
  configuration = JSON.parse(localStorage.getItem("sessions.configuration"))
}

function orderSessions(config) {
  const length = config.workSessionsCountBeforeLongBreak
  const order = []

  for (let i = 0, j = 0; j < length; i++) {
    if (i % 2 === 0) {
      order.push("work_session")
      j++
    } else order.push("short_break")
  }

  order.push("long_break")

  return order
}

const initialState = {
  configuration,
  order: orderSessions(configuration),
  loop: 1,
  current: 0,
  session: "work_session",
}

const handlers = {
  [SET_CONFIGURATION]: (state, { payload }) => {
    const configuration = {
      ...state.configuration,
      ...payload,
    }

    localStorage.setItem(
      "sessions.configuration",
      JSON.stringify(configuration)
    )

    return {
      ...state,
      configuration,
      order: orderSessions(configuration),
    }
  },
  [SET_CURRENT_SESSION]: (state, { payload }) => ({
    ...state,
    current: payload.current,
    session: payload.session,
  }),
  [SET_SESSION_LOOP]: (state, { payload }) => ({
    ...state,
    loop: payload,
  }),
  DEFAULT: state => state,
}

export function sessionsReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
