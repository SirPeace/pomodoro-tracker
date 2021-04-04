import React from "react"
import { Button } from "@material-ui/core"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import {
  setPersistantDrawer,
  setTemporaryDrawer,
} from "../../store/actions/layout"
import { useStyles } from "./styles"
import { login, logout } from "../../store/actions/auth"

function ApplicationDrawer({
  user,
  token,
  closeAllDrawers,
  closeTempDrawer,
  login,
  logout,
}) {
  const classes = useStyles()

  const links = [
    { to: "/progress", text: "Progress", auth: true },
    { to: "/about", text: "About" },
    { to: "/how-to-use", text: "How to use it" },
  ]

  const loggedIn = user && token

  const renderLinks = () =>
    links.map((link, i) => {
      if (link.auth) {
        return loggedIn ? (
          <Button
            onClick={closeAllDrawers}
            className={classes.button}
            component={Link}
            to={link.to}
            key={i}
          >
            {link.text}
          </Button>
        ) : null
      }

      return (
        <Button
          onClick={closeAllDrawers}
          className={classes.button}
          component={Link}
          to={link.to}
          key={i}
        >
          {link.text}
        </Button>
      )
    })

  return (
    <div className={classes.ApplicationDrawer}>
      <h3 className={classes.logo}>
        <Link to="/" className={classes.logo__link} onClick={closeTempDrawer}>
          Pomodoro Tracker
        </Link>
      </h3>

      {renderLinks()}

      <hr className={`${classes.hr}`} />
      {loggedIn ? (
        <Button className={classes.button} onClick={() => logout()}>
          Sign out
        </Button>
      ) : (
        <Button className={classes.button} onClick={() => login()}>
          Sign in with Google
        </Button>
      )}

      {user && (
        <div className={classes.userInfo}>
          <img
            src={user.photoURL}
            alt="Avatar"
            className={classes.userInfo__avatar}
          />
          <p className={classes.userInfo__text}>
            Logged in as:
            <br />
            <span className={classes.userInfo__name}>{user.displayName}</span>
          </p>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
})

const mapDispatchToProps = dispatch => ({
  closeAllDrawers: () => {
    dispatch(setTemporaryDrawer(undefined))
    dispatch(setPersistantDrawer(undefined))
  },
  closeTempDrawer: () => dispatch(setTemporaryDrawer(undefined)),
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDrawer)
