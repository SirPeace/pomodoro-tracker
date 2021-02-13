import {
  SET_PERS_DRAWER,
  SET_TEMP_DRAWER,
  SET_POPUP,
  SET_THEME,
} from "../actions/actionTypes"

/**
 *
 * @property {string} theme - Active theme ["light"|"dark"]
 * @property {?string} popup - Displayed popup name
 * @property {?string} persistant_drawer - Displayed persistant drawer name
 * @property {?string} temp_drawer - Displayed temporary drawer name
 */
const initialState = {
  theme: "light",
  popup: undefined,
  persistant_drawer: undefined,
  temporary_drawer: undefined,
}

const handlers = {
  [SET_THEME]: (state, { payload }) => ({
    ...state,
    theme: payload,
  }),
  [SET_POPUP]: (state, { payload }) => ({
    ...state,
    popup: payload,
  }),
  [SET_PERS_DRAWER]: (state, { payload }) => ({
    ...state,
    persistant_drawer: payload,
  }),
  [SET_TEMP_DRAWER]: (state, { payload }) => ({
    ...state,
    temporary_drawer: payload,
  }),
  DEFAULT: state => state,
}

export function layoutReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
