import React from "react";
import classes from "./Layout.module.scss";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
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

  return (
    <div className={classes.Layout}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pomodoro Timer
          </Typography>

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

      <Container maxWidth="sm" className={classes.body}>
        <Backdrop
          open={!!props.popup}
          className={backdropClass}
          onClick={e => handleBackdropClick(e)}
        >
          <SettingsPopup id="settings-popup" />
        </Backdrop>

        {props.children}
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  theme: state.layout.theme,
  popup: state.layout.popup,
});

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(setTheme(theme)),
  setPopup: name => dispatch(setPopup(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
