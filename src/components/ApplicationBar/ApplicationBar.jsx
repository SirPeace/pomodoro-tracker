import React from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  useTheme,
  ThemeProvider,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import CheckIcon from "@material-ui/icons/Check"
import { connect } from "react-redux"
import {
  setPersistantDrawer,
  setPopup,
  setTemporaryDrawer,
  setTheme,
} from "../../store/actions/layout"
import { useStyles } from "./styles"

const isAppPage = () => window.location.pathname === "/app"

function ApplicationBar({
  sessionLoop,
  sessionsCount,
  sessionOrder,
  session,

  theme,
  pers_drawer,
  temp_drawer,

  setTheme,
  setPopup,
  setTempDrawer,
  setPersDrawer,
}) {
  const classes = useStyles()
  const sessionTheme = useTheme()

  const workID = ((sessionLoop - 1) * sessionsCount) / 2 + sessionOrder / 2 + 1
  let sessionProgressMsg = `Work session #${workID}`
  if (session === "short_break") sessionProgressMsg = "Short break"
  else if (session === "long_break") sessionProgressMsg = "Long break"

  const SessionProgress = isAppPage() && (
    <>
      <span
        className={`${classes.separator} ${classes.sessionProgress__separator}`}
      ></span>
      <p className={classes.sessionProgress}>{sessionProgressMsg}</p>
    </>
  )

  const AppControls = isAppPage() && (
    <>
      <Tooltip title="Tasks" arrow>
        <IconButton
          edge="start"
          className={classes.barButton}
          color="inherit"
          aria-label="to-do"
          onClick={() => toggleDrawer("p", "tasks")}
        >
          <CheckIcon />
        </IconButton>
      </Tooltip>
    </>
  )

  const toggleDrawer = (type, name) => {
    if (type === "p") {
      if (pers_drawer === name) setPersDrawer(undefined)
      else setPersDrawer(name)
    } else if (type === "t") {
      if (temp_drawer === name) setTempDrawer(undefined)
      else setTempDrawer(name)
    }
  }

  return (
    <ThemeProvider theme={sessionTheme}>
      <AppBar position="static" className={`${classes.ApplicationBar}`}>
        <Toolbar>
          <IconButton
            edge="start"
            className={`${classes.barButton} ${classes.appDrawerButton}`}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer("t", "root")}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.title}>
            <h1 className={classes.appTitle}>Pomodoro Tracker</h1>
            {SessionProgress}
          </div>

          {AppControls}
          {/* <Tooltip title="Toggle theme" arrow>
            <IconButton
              edge="start"
              className={classes.barButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setTheme(theme)}
            >
              {theme === "light" ? <Brightness7 /> : <Brightness3 />}
            </IconButton>
          </Tooltip> */}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  // layout
  theme: state.layout.theme,
  pers_drawer: state.layout.persistant_drawer,
  temp_drawer: state.layout.temporary_drawer,

  // sessions
  session: state.sessions.order[state.sessions.current],
  sessionOrder: state.sessions.current,
  sessionsCount: state.sessions.order.length,
  sessionLoop: state.sessions.loop,
})

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(setTheme(theme)),
  setPopup: name => dispatch(setPopup(name)),
  setPersDrawer: name => dispatch(setPersistantDrawer(name)),
  setTempDrawer: name => dispatch(setTemporaryDrawer(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationBar)
