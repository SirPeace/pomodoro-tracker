import { Button } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { setTemporaryDrawer } from "../../store/actions/layout"
import { useStyles } from "./styles"

function ApplicationDrawer({ session, closeDrawer }) {
  const classes = useStyles()

  const links = [
    { to: "/progress", text: "Progress" },
    { to: "/about", text: "About" },
    { to: "/how-to-use", text: "How to use it" },
  ]

  const renderLinks = () =>
    links.map((link, i) => (
      <Button
        onClick={closeDrawer}
        className={classes.button}
        component={Link}
        to={link.to}
        key={i}
      >
        {link.text}
      </Button>
    ))

  const triggerAppInstallation = () => {
    // TODO: Application install logic
  }

  return (
    <div className={classes.ApplicationDrawer}>
      <h3 className={classes.logo}>
        <Link to="/" className={classes.logo__link} onClick={closeDrawer}>
          Pomodoro Tracker
        </Link>
      </h3>

      {renderLinks()}

      <hr className={`${classes.hr}`} />

      <Button
        className={`${classes.install_button} ${classes.button}`}
        onClick={triggerAppInstallation}
      >
        Install Web App
      </Button>
    </div>
  )
}

const mapStateToProps = state => ({
  session: state.sessions.order[state.sessions.current],
})

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(setTemporaryDrawer(undefined)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDrawer)
