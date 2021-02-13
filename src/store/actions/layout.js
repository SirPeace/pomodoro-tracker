import {
  SET_POPUP,
  SET_THEME,
  SET_PERS_DRAWER,
  SET_TEMP_DRAWER,
} from "./actionTypes"

export const setTheme = theme => ({
  type: SET_THEME,
  payload: theme,
})

export const setPopup = name => ({
  type: SET_POPUP,
  payload: name,
})

export const setPersistantDrawer = name => ({
  type: SET_PERS_DRAWER,
  payload: name,
})

export const setTemporaryDrawer = name => ({
  type: SET_TEMP_DRAWER,
  payload: name,
})
