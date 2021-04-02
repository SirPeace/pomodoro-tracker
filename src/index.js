import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import firebase from "firebase/app"

import "./index.css"
import App from "./App.jsx"
import reportWebVitals from "./reportWebVitals"
import rootReducer from "./store/reducers/rootReducer"
import { throwNotification } from "./libs/functions"

// Redux devtools register
const composeEnhancers =
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV === "test"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const middleware = [thunk]
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
)

firebase.initializeApp({
  apiKey: "AIzaSyDaXpQee9Zw0VmQVPS5UWlpr62srx6cROI",
  projectId: "pomodoro-tracker-922c7",
  authDomain: "pomodoro-tracker-922c7.firebaseapp.com",
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .catch(err => console.error("SW has an error: ", err.message))

  // Request notifications permission and show one after accept
  if ("Notification" in window) {
    const permission = Notification.permission
    Notification.requestPermission(() => {
      if (permission !== "granted") {
        throwNotification(
          "Notifications are active",
          "Yay! Notifications are successfuly set up"
        )
      }
    })
  }
}
