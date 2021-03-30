import { SET_USER, SET_TOKEN } from "../actions/actionTypes"

/**
 * @property {firebase.User | null} user - Logged in user
 * @property {firebase.auth.OAuthCredential.accessToken | null} token - OAuth access token
 */
const initialState = {
  user: null,
  token: null,
}

const handlers = {
  [SET_USER]: (state, { payload: user }) => ({
    ...state,
    user,
  }),
  [SET_TOKEN]: (state, { payload: token }) => ({
    ...state,
    token,
  }),
  DEFAULT: state => state,
}

export function authReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
