import React from "react";
import classes from "./SessionsProgress.module.scss";
import { connect } from "react-redux";

function SessionsProgress() {
  return <div className={classes.SessionsProgress}></div>;
}

const mapStateToProps = state => ({
  progress: state.timer.progress,
});

export default connect(mapStateToProps)(SessionsProgress);
