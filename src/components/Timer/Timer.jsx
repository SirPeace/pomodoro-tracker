import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import {
  pauseTimer,
  resumeTimer,
  startTimer,
  stopTimer,
} from "../../store/actions/timer";
import classes from "./Timer.module.scss";

function Timer({
  time,
  status,
  duration,
  timePassed,

  startTimer,
  pauseTimer,
  resumeTimer,
  stopTimer,
}) {
  const [isBtnLocked, setIsBtnLocked] = React.useState(false);
  let circleClass = "";

  const radius = 150;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = React.useState(circumference);
  const offsetRef = circumference;

  const playAnimation = () => {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      //* Counted correctly apart from a slight measurement error
      window.animationProgress = (time - start + timePassed) / duration;

      if (window.animationProgress >= 0.998) window.animationProgress = 1;

      setOffset(offsetRef + offsetRef * window.animationProgress);

      if (window.animationProgress < 1) {
        window.animationID = requestAnimationFrame(animate);
      }
    });
  };

  const handleTimerStart = () => {
    if (isBtnLocked) return;
    else {
      setIsBtnLocked(true);
      window.setTimeout(setIsBtnLocked.bind(null, false), 1000);
    }

    setOffset(circumference);

    startTimer();
    playAnimation();
  };

  const handleTimerResume = () => {
    if (isBtnLocked) return;
    else {
      setIsBtnLocked(true);
      window.setTimeout(setIsBtnLocked.bind(null, false), 1000);
    }

    resumeTimer();
    playAnimation();
  };

  const handleTimerPause = () => {
    if (isBtnLocked) return;
    else {
      setIsBtnLocked(true);
      window.setTimeout(setIsBtnLocked.bind(null, false), 1000);
    }

    pauseTimer();
  };

  const handleTimerStop = () => {
    stopTimer();

    setOffset(circumference);
  };

  if (status === "finished") {
    circleClass = classes.finished;
  } else {
    circleClass = "";
  }

  return (
    <div className={classes.Timer}>
      <div className={classes.progress}>
        <span className={classes.counter}>{time.toString()}</span>
        <svg>
          <circle cx="50%" cy="50%" r={radius} className={classes.rails} />
          <circle
            className={`${classes.progress} ${circleClass}`}
            cx="50%"
            cy="50%"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
      </div>

      <div className={classes.buttons}>
        {status === "running" ? (
          <>
            <Button
              variant="contained"
              className={`${classes.button} ${classes.pause}`}
              onClick={handleTimerPause}
              disabled={isBtnLocked}
            >
              Pause
            </Button>
            <Button
              variant="contained"
              className={`${classes.button} ${classes.stop}`}
              onClick={handleTimerStop}
            >
              Stop
            </Button>
          </>
        ) : status === "paused" ? (
          <>
            <Button
              variant="contained"
              className={`${classes.button} ${classes.start}`}
              onClick={handleTimerResume}
              disabled={isBtnLocked}
            >
              Resume
            </Button>
            <Button
              variant="contained"
              className={`${classes.button} ${classes.stop}`}
              onClick={handleTimerStop}
            >
              Stop
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            className={`${classes.button} ${classes.start}`}
            onClick={handleTimerStart}
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  animationID: state.timer.animationID,
  duration: state.timer.duration,
  time: state.timer.time,
  status: state.timer.status,
  timePassed: state.timer.running.passed,
});

const mapDispatchToProps = dispatch => ({
  startTimer: () => dispatch(startTimer()),
  resumeTimer: () => dispatch(resumeTimer()),
  pauseTimer: () => dispatch(pauseTimer()),
  stopTimer: () => dispatch(stopTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
