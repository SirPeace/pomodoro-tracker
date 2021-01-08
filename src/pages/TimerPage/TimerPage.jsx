import React from "react";
import Timer from "../../components/Timer/Timer";
import SessionsProgress from "../../components/SessionsProgress/SessionsProgress";
import classes from "./TimerPage.module.scss";
import { connect } from "react-redux";

function TimerPage({ session, status }) {
  let sessionTitle = "Focus...";
  if (status !== "running" || session.endsWith("break")) {
    sessionTitle = "It's time to work!";
    if (session === "short_break") sessionTitle = "Take a short break!";
    else if (session === "long_break") sessionTitle = "Have a proper rest!";
  }

  return (
    <div className={classes.TimerPage}>
      <SessionsProgress />

      <h2>{sessionTitle}</h2>

      <Timer />
    </div>
  );
}

const mapStateToProps = state => ({
  // timer
  status: state.timer.status,

  // sessions
  session: state.sessions.order[state.sessions.current],
});

export default connect(mapStateToProps)(TimerPage);
