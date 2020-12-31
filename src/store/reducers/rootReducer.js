import { combineReducers } from "redux";
import { layoutReducer } from "./layout";
import { timerReducer } from "./timer";
import { settingsReducer } from "./settings";

export default combineReducers({
  layout: layoutReducer,
  timer: timerReducer,
  settings: settingsReducer,
});
