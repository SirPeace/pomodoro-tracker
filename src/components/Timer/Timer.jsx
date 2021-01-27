import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import {
  pauseTimer,
  resumeTimer,
  setDuration,
  setTime,
  startTimer,
  stopTimer,
} from "../../store/actions/timer";
import { resetSessionOrder } from "../../store/actions/sessions";
import { useStyles } from "./styles";

function Timer({
  // timer
  time,
  status,
  duration,
  timePassed,

  startTimer,
  pauseTimer,
  resumeTimer,
  stopTimer,
  setTime,
  setDuration,

  // sessions
  session,
  currentSessionId,
  configuration,

  resetSessionOrder,
}) {
  const classes = useStyles();
  const [isBtnLocked, setIsBtnLocked] = React.useState(false);

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

  const handleTimerReset = () => {
    handleTimerStop();
    resetSessionOrder();
  };

  // Change timer's time and duration according to the current session
  React.useEffect(() => {
    let duration = "";

    if (session === "work_session") duration = "workSessionDuration";
    else if (session === "short_break") duration = "shortBreakDuration";
    else duration = "longBreakDuration";

    setTime(configuration[duration], "m");
    setDuration(configuration[duration], "m");
  }, [circumference, session, configuration, setTime, setDuration]);

  // Change elements color according to the current session
  let sessionProgressClass = "";
  let sessionButtonClass = "";
  if (session === "short_break") {
    sessionProgressClass = classes.circle__progress_short_break;
    sessionButtonClass = classes.controls__startButton_short_break;
  } else if (session === "long_break") {
    sessionProgressClass = classes.circle__progress_long_break;
    sessionButtonClass = classes.controls__startButton_long_break;
  }

  return (
    <div className={classes.Timer}>
      <div className={classes.progress}>
        <span className={classes.counter}>{time}</span>
        <svg>
          <circle cx="50%" cy="50%" r={radius} />
          <circle
            className={`${classes.circle__progress} ${sessionProgressClass}`}
            cx="50%"
            cy="50%"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
      </div>

      <div className={classes.controls}>
        {status === "running" ? (
          <>
            <Button
              variant="contained"
              className={`${classes.controls__button} ${classes.controls__pauseButton}`}
              onClick={handleTimerPause}
              disabled={isBtnLocked}
            >
              Pause
            </Button>
            <Button
              variant="contained"
              className={`${classes.controls__button} ${classes.controls__stopButton}`}
              onClick={handleTimerStop}
            >
              Stop
            </Button>
          </>
        ) : status === "paused" ? (
          <>
            <Button
              variant="contained"
              className={`${classes.controls__button} ${classes.controls__startButton} ${sessionButtonClass}`}
              onClick={handleTimerResume}
              disabled={isBtnLocked}
            >
              Resume
            </Button>
            <Button
              variant="contained"
              className={`${classes.controls__button} ${classes.controls__stopButton}`}
              onClick={handleTimerStop}
            >
              Stop
            </Button>
          </>
        ) : currentSessionId > 0 ? (
          <>
            <Button
              variant="contained"
              className={`${classes.controls__button} ${classes.controls__startButton} ${sessionButtonClass}`}
              onClick={handleTimerStart}
            >
              Start
            </Button>
            <Button
              variant="contained"
              className={`${classes.controls__button} ${classes.controls__pauseButton}`}
              onClick={handleTimerReset}
            >
              Reset
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            className={`${classes.controls__button} ${classes.controls__startButton} ${sessionButtonClass}`}
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
  // timer
  animationID: state.timer.animationID,
  duration: state.timer.duration,
  time: state.timer.time,
  status: state.timer.status,
  timePassed: state.timer.running.passed,

  // sessions
  session: state.sessions.order[state.sessions.current],
  currentSessionId: state.sessions.current,
  configuration: state.sessions.configuration,
});

const mapDispatchToProps = dispatch => ({
  // timer
  startTimer: () => dispatch(startTimer()),
  resumeTimer: () => dispatch(resumeTimer()),
  pauseTimer: () => dispatch(pauseTimer()),
  stopTimer: () => dispatch(stopTimer()),
  setTime: (value, unit) => dispatch(setTime(value, unit)),
  setDuration: (value, unit) => dispatch(setDuration(value, unit)),

  // sessions
  resetSessionOrder: () => dispatch(resetSessionOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
