import { SET_POPUP, SET_THEME, SET_DRAWER } from "./actionTypes";

export const setTheme = theme => ({
  type: SET_THEME,
  payload: theme,
});

export const setPopup = name => ({
  type: SET_POPUP,
  payload: name,
});

export const setDrawer = name => ({
  type: SET_DRAWER,
  payload: name,
});
