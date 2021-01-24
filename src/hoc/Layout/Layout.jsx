import React from "react";
import classes from "./Layout.module.scss";
import { Backdrop, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setPopup, setDrawer } from "../../store/actions/layout";
import SettingsPopup from "../../components/SettingsPopup/SettingsPopup";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";
import TaskManager from "../../components/TaskManager/TaskManager";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paperDrawer: {
    minWidth: 280,
    top: 65, // TODO: Make this value depend on AppBar height
  },
}));

function Layout({ drawer, setDrawer, popup, setPopup, children }) {
  const styles = useStyles();

  const handleBackdropClick = event => {
    if (!event.target.closest("#settings-popup")) {
      setPopup(false);
    }
  };

  return (
    <div className={classes.Layout}>
      <ApplicationBar />
      <Backdrop
        open={!!popup}
        className={styles.backdrop}
        onClick={e => handleBackdropClick(e)}
      >
        <SettingsPopup id="settings-popup" />
      </Backdrop>

      <div className={classes.body}>
        <Drawer
          open={!!drawer}
          anchor="right"
          variant="persistent"
          classes={{ paper: styles.paperDrawer }}
        >
          <TaskManager />
        </Drawer>

        {children}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  popup: state.layout.popup,
  drawer: state.layout.drawer,
});

const mapDispatchToProps = dispatch => ({
  setPopup: name => dispatch(setPopup(name)),
  setDrawer: name => dispatch(setDrawer(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
