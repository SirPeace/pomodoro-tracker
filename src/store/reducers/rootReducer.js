import { combineReducers } from "redux";
import { layoutReducer } from "./layout";
import { timerReducer } from "./timer";
import { sessionsReducer } from "./sessions";

export default combineReducers({
  layout: layoutReducer,
  timer: timerReducer,
  sessions: sessionsReducer,
});
