import { combineReducers } from "redux"
import { layoutReducer } from "./layout"
import { timerReducer } from "./timer"
import { sessionsReducer } from "./sessions"
import { tasksReducer } from "./tasks"
import { authReducer } from "./auth"
import { progressReducer } from "./progress"

export default combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  progress: progressReducer,
  sessions: sessionsReducer,
  tasks: tasksReducer,
  timer: timerReducer,
})
