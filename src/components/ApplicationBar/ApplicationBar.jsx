import React from "react";
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import CheckIcon from "@material-ui/icons/Check";
import Brightness7 from "@material-ui/icons/Brightness7";
import Brightness3 from "@material-ui/icons/Brightness3";
import { connect } from "react-redux";
import { setDrawer, setPopup, setTheme } from "../../store/actions/layout";
import classes from "./ApplicationBar.module.scss";

function ApplicationBar({
  sessionLoop,
  sessionsCount,
  sessionOrder,
  session,

  theme,
  drawer,

  setTheme,
  setPopup,
  setDrawer,
}) {
  const workID = ((sessionLoop - 1) * sessionsCount) / 2 + sessionOrder / 2 + 1;

  let sessionProgress = `Work session (#${workID})`;
  if (session === "short_break") sessionProgress = "Short break";
  else if (session === "long_break") sessionProgress = "Long break";

  const toggleDrawer = name => {
    if (drawer === name) setDrawer(false);
    else setDrawer(name);
  };

  return (
    <AppBar
      position="static"
      className={`${classes.ApplicationBar} ${classes[session] || ""}`}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
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
            onClick={() => toggleDrawer("tasks")}
          >
            <CheckIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  // layout
  theme: state.layout.theme,
  drawer: state.layout.drawer,

  // sessions
  session: state.sessions.order[state.sessions.current],
  sessionOrder: state.sessions.current,
  sessionsCount: state.sessions.order.length,
  sessionLoop: state.sessions.loop,
});

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(setTheme(theme)),
  setPopup: name => dispatch(setPopup(name)),
  setDrawer: name => dispatch(setDrawer(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationBar);
