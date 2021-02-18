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
import SettingsIcon from "@material-ui/icons/Settings"
import CheckIcon from "@material-ui/icons/Check"
import Brightness7 from "@material-ui/icons/Brightness7"
import Brightness3 from "@material-ui/icons/Brightness3"
import { connect } from "react-redux"
import {
  setPersistantDrawer,
  setPopup,
  setTemporaryDrawer,
  setTheme,
} from "../../store/actions/layout"
import { useStyles } from "./styles"

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
  const workID = ((sessionLoop - 1) * sessionsCount) / 2 + sessionOrder / 2 + 1
  const classes = useStyles()

  // const sessionClass = useSessionClass(session, {
  //   short_break: classes.ApplicationBar_short_break,
  //   long_break: classes.ApplicationBar_long_break,
  // })

  let sessionProgress = `Work session (#${workID})`
  if (session === "short_break") sessionProgress = "Short break"
  else if (session === "long_break") sessionProgress = "Long break"

  const toggleDrawer = (type, name) => {
    if (type === "p") {
      if (pers_drawer === name) setPersDrawer(undefined)
      else setPersDrawer(name)
    } else if (type === "t") {
      if (temp_drawer === name) setTempDrawer(undefined)
      else setTempDrawer(name)
    }
  }

  const sessionTheme = useTheme()

  return (
    <ThemeProvider theme={sessionTheme}>
      <AppBar position="static" className={`${classes.ApplicationBar}`}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer("t", "root")}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.title}>
            <h1 className={classes.appTitle}>Pomodoro Tracker</h1>
            <span className={classes.separator}>&nbsp;|&nbsp;</span>
            <span className={classes.sessionProgress}>{sessionProgress}</span>
          </div>

          <Tooltip title="Toggle theme" arrow>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setTheme(theme)}
            >
              {theme === "light" ? <Brightness7 /> : <Brightness3 />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings" arrow>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="settings"
              onClick={() => setPopup("settings")}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Tasks" arrow>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="to-do"
              onClick={() => toggleDrawer("p", "tasks")}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
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
