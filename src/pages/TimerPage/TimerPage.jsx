import React from "react";
import Timer from "../../components/Timer/Timer";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import classes from "./TimerPage.module.scss";

export default function TimerPage() {
  return (
    <div className={classes.TimerPage}>
      <ProgressBar />
      <Timer />
    </div>
  );
}
