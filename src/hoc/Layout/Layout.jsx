import React from "react";
import classes from "./Layout.module.scss";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Backdrop,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import Brightness7 from "@material-ui/icons/Brightness7";
import Brightness3 from "@material-ui/icons/Brightness3";
import { connect } from "react-redux";
import { setPopup, setTheme } from "../../store/actions/layout";
import SettingsPopup from "../../components/SettingsPopup/SettingsPopup";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Layout(props) {
  const backdropClass = useStyles().backdrop;

  const handleBackdropClick = event => {
    if (!event.target.closest("#settings-popup")) {
      props.setPopup(false);
    }
  };

  const workID =
    ((props.sessionLoop - 1) * props.sessionsCount) / 2 +
    props.sessionOrder / 2 +
    1;

  let sessionProgress = `Work session (#${workID})`;
  if (props.session === "short_break") sessionProgress = "Short break";
  else if (props.session === "long_break") sessionProgress = "Long break";

  return (
    <div className={classes.Layout}>
      <AppBar
        position="static"
        className={`${classes.AppBar} ${classes[props.session]}`}
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
            <h1 className={classes.appTitle}>Pomodoro Timer</h1>
            <span className={classes.separator}>&nbsp;|&nbsp;</span>
            <span className={classes.sessionProgress}>{sessionProgress}</span>
          </div>
          <Tooltip title="Toggle theme" arrow>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => props.setTheme(props.theme)}
            >
              {props.theme === "light" ? <Brightness7 /> : <Brightness3 />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" arrow>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="settings"
              onClick={() => props.setPopup("settings")}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <div className={classes.body}>
        <Backdrop
          open={!!props.popup}
          className={backdropClass}
          onClick={e => handleBackdropClick(e)}
        >
          <SettingsPopup id="settings-popup" />
        </Backdrop>

        {props.children}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  theme: state.layout.theme,
  popup: state.layout.popup,

  // sessions
  session: state.sessions.order[state.sessions.current],
  sessionOrder: state.sessions.current,
  sessionsCount: state.sessions.order.length,
  sessionLoop: state.sessions.loop,
});

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(setTheme(theme)),
  setPopup: name => dispatch(setPopup(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
