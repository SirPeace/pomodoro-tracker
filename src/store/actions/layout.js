import { SET_POPUP, SET_THEME } from "./actionTypes";

export const setTheme = theme => ({
  type: SET_THEME,
  payload: theme,
});

export const setPopup = name => ({
  type: SET_POPUP,
  payload: name,
});
