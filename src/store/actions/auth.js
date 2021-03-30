import firebase from "firebase/app"
import "firebase/auth"

import { SET_TOKEN, SET_USER } from "./actionTypes"

const setUser = user => ({
  type: SET_USER,
  payload: user,
})

const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
})

export const login = () => dispatch => {
  const authProvider = new firebase.auth.GoogleAuthProvider()

  firebase
    .auth()
    .signInWithPopup(authProvider)
    .then(result => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential

      const token = credential.accessToken
      const user = result.user

      localStorage.setItem("auth.token", token)
      localStorage.setItem("auth.user", JSON.stringify(user))

      dispatch(setUser(user))
      dispatch(setToken(token))
    })
    .catch(error => {
      console.error(error.message)
    })
}

export const logout = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem("auth.user")
      localStorage.removeItem("auth.token")

      dispatch(setUser(null))
      dispatch(setToken(null))
    })
    .catch(error => {
      console.error(error.message)
    })
}

export const attemptAutoLogin = () => dispatch => {
  const user = JSON.parse(localStorage.getItem("auth.user"))
  const token = localStorage.getItem("auth.token")

  if (user && token) {
    dispatch(setUser(user))
    dispatch(setToken(token))
  }
}
