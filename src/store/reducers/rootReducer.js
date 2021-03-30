import { combineReducers } from "redux"
import { layoutReducer } from "./layout"
import { timerReducer } from "./timer"
import { sessionsReducer } from "./sessions"
import { tasksReducer } from "./tasks"
import { authReducer } from "./auth"

export default combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  timer: timerReducer,
  sessions: sessionsReducer,
  tasks: tasksReducer,
})
