import {
  Paper,
  TextField,
  InputAdornment,
  Grid,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { connect } from "react-redux";
import { useStyles } from "./styles";
import { setPopup } from "../../store/actions/layout";
import { setConfiguration } from "../../store/actions/sessions";

function SettingsPopup({
  id,

  shortBreakDuration,
  longBreakDuration,
  workSessionDuration,
  workSessionsCountBeforeLongBreak,

  closePopup,
  setConfiguration,
}) {
  const [formControls, setFormControls] = React.useState({
    work_session: {
      value: workSessionDuration,
    },
    short_break: {
      value: shortBreakDuration,
    },
    long_break: {
      value: longBreakDuration,
    },
    work_sessions_before_long_break: {
      value: workSessionsCountBeforeLongBreak,
    },
  });

  const classes = useStyles();

  const handleFormSubmit = event => {
    event.preventDefault();

    // TODO: Save settings to the state
    setConfiguration({
      workSessionDuration: formControls.work_session.value,
      shortBreakDuration: formControls.short_break.value,
      longBreakDuration: formControls.long_break.value,
      workSessionsCountBeforeLongBreak:
        formControls.work_sessions_before_long_break.value,
    });

    closePopup();
  };

  const changeFormControl = (name, value) => {
    setFormControls({
      ...formControls,
      [name]: {
        ...formControls.name,
        value,
      },
    });
  };

  return (
    <Paper elevation="1" className={classes.SettingsPopup} id={id}>
      <header className={classes.header}>
        <CloseIcon
          className={classes.closeIcon}
          onClick={closePopup.bind(null)}
        />
      </header>

      <form className={classes.body}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              name="work_session"
              className={classes.TextField}
              label="Work session"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={formControls.work_session.value}
              onChange={e => changeFormControl(e.target.name, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Minutes</InputAdornment>
                ),
                className: classes.TextField__input,
              }}
              InputLabelProps={{
                className: classes.TextField__label,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="short_break"
              className={classes.TextField}
              label="Short break"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={formControls.short_break.value}
              onChange={e => changeFormControl(e.target.name, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Minutes</InputAdornment>
                ),
                className: classes.TextField__input,
              }}
              InputLabelProps={{
                className: classes.TextField__label,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="long_break"
              className={classes.TextField}
              label="Long break"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={formControls.long_break.value}
              onChange={e => changeFormControl(e.target.name, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Minutes</InputAdornment>
                ),
                className: classes.TextField__input,
              }}
              InputLabelProps={{
                className: classes.TextField__label,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="work_sessions_before_long_break"
              className={classes.TextField}
              label="Work sessions before long break"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={formControls.work_sessions_before_long_break.value}
              onChange={e => changeFormControl(e.target.name, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Count</InputAdornment>
                ),
                className: classes.TextField__input,
              }}
              InputLabelProps={{
                className: classes.TextField__label,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={event => handleFormSubmit(event)}
            >
              Save changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

const mapStateToProps = state => ({
  shortBreakDuration: state.sessions.configuration.shortBreakDuration,
  longBreakDuration: state.sessions.configuration.longBreakDuration,
  workSessionDuration: state.sessions.configuration.workSessionDuration,
  workSessionsCountBeforeLongBreak:
    state.sessions.configuration.workSessionsCountBeforeLongBreak,
});

const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(setPopup(false)),
  setConfiguration: configuration => dispatch(setConfiguration(configuration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPopup);
