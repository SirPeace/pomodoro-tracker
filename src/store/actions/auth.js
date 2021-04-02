import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import { SET_TOKEN, SET_USER } from "./actionTypes"
import { fetchUserState, uploadUserState } from "../db"
import {
  refreshCharts,
  refreshStreak,
  setProgress,
  refreshTodayProgress,
  parseServerData,
} from "./progress"
import { setTasks } from "./tasks"
import { setConfiguration } from "./sessions"

const setUser = user => ({
  type: SET_USER,
  payload: user,
})

const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
})

export const login = () => async dispatch => {
  const authProvider = new firebase.auth.GoogleAuthProvider()
  let response

  try {
    response = await firebase.auth().signInWithPopup(authProvider)
  } catch (err) {
    console.log("Auth error: " + err.message)
  }

  if (response) {
    const credential = response.credential

    const token = credential.accessToken
    const user = response.user

    localStorage.setItem("auth.token", token)
    localStorage.setItem("auth.user", JSON.stringify(user))

    dispatch(setUser(user))
    dispatch(setToken(token))

    const remoteState = await fetchUserState(user)

    if (remoteState) {
      dispatch(setTasks(remoteState.tasks))
      dispatch(setConfiguration(remoteState.configuration))
      dispatch(setProgress(parseServerData(remoteState.progress)))

      dispatch(refreshStreak())
      dispatch(refreshCharts())
      dispatch(refreshTodayProgress())
    } else {
      dispatch(uploadUserState())
    }
  }
}

export const logout = () => async dispatch => {
  await firebase.auth().signOut()

  localStorage.removeItem("auth.user")
  localStorage.removeItem("auth.token")

  dispatch(setUser(null))
  dispatch(setToken(null))
}

export const attemptAutoLogin = () => async (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem("auth.user"))
  const token = localStorage.getItem("auth.token")

  if (user && token) {
    dispatch(setUser(user))
    dispatch(setToken(token))

    const remoteState = await fetchUserState(user)

    if (remoteState) {
      dispatch(setTasks(remoteState.tasks))
      dispatch(setConfiguration(remoteState.configuration))
      dispatch(setProgress(parseServerData(remoteState.progress)))

      dispatch(refreshStreak())
      dispatch(refreshCharts())
      dispatch(refreshTodayProgress())
    } else {
      console.log("Remote state not found for " + user.uid)
      dispatch(logout())
    }
  }
}
