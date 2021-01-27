import React from "react";
import Timer from "../../components/Timer/Timer";
import { connect } from "react-redux";
import { useStyles } from "./styles";

function TimerPage({ session, status }) {
  const classes = useStyles();

  let sessionTitle = "Focus...";
  if (status !== "running" || session.endsWith("break")) {
    sessionTitle = "It's time to work!";
    if (session === "short_break") sessionTitle = "Take a short break!";
    else if (session === "long_break") sessionTitle = "Have a proper rest!";
  }

  return (
    <div className={classes.TimerPage}>
      <h2 className={classes.h2}>{sessionTitle}</h2>

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
