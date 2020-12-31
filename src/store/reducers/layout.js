import { SET_POPUP, SET_THEME } from "../actions/actionTypes";

const initialState = {
  theme: "light",
  popup: false,
};

const handlers = {
  [SET_THEME]: (state, { payload }) => ({
    ...state,
    theme: payload === "light" ? "dark" : "light",
  }),
  [SET_POPUP]: (state, { payload }) => ({
    ...state,
    popup: payload,
  }),
  DEFAULT: state => state,
};

export function layoutReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
}
