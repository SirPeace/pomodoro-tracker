import {
  Paper,
  TextField,
  InputAdornment,
  Grid,
  Button,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { connect } from "react-redux";
import classes from "./SettingsPopup.module.scss";
import { setPopup } from "../../store/actions/layout";
import {
  setLongBreakDuration,
  setSmallBreakDuration,
  setWorkSessionDuration,
} from "../../store/actions/settings";

const theme = createMuiTheme({
  palette: {
    primary: pink,
  },
});

function SettingsPopup({
  id,

  smallBreakDuration,
  longBreakDuration,
  workSessionDuration,

  closePopup,
  setWorkSessionDuration,
  setSmallBreakDuration,
  setLongBreakDuration,
}) {
  const [formControls, setFormControls] = React.useState({
    work_session: {
      value: workSessionDuration,
    },
    small_break: {
      value: smallBreakDuration,
    },
    long_break: {
      value: longBreakDuration,
    },
  });

  const handleFormSubmit = event => {
    event.preventDefault();

    // TODO: Save settings to the state
    setWorkSessionDuration(formControls.work_session.value);
    setSmallBreakDuration(formControls.small_break.value);
    setLongBreakDuration(formControls.long_break.value);

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
      <header>
        <CloseIcon
          className={classes.closeIcon}
          onClick={closePopup.bind(null)}
        />
      </header>

      <form className={classes.body}>
        <ThemeProvider theme={theme}>
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
                onChange={e =>
                  changeFormControl("work_session", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Minutes</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="small_break"
                className={classes.TextField}
                label="Small break"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formControls.small_break.value}
                onChange={e => changeFormControl("small_break", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Minutes</InputAdornment>
                  ),
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
                onChange={e => changeFormControl("long_break", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Minutes</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  onClick={event => handleFormSubmit(event)}
                >
                  Save changes
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </ThemeProvider>
      </form>
    </Paper>
  );
}

const mapStateToProps = state => ({
  smallBreakDuration: state.settings.smallBreakDuration,
  longBreakDuration: state.settings.longBreakDuration,
  workSessionDuration: state.settings.workSessionDuration,
});

const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(setPopup(false)),
  setWorkSessionDuration: duration => {
    dispatch(setWorkSessionDuration(duration));
  },
  setSmallBreakDuration: duration => {
    dispatch(setSmallBreakDuration(duration));
  },
  setLongBreakDuration: duration => {
    dispatch(setLongBreakDuration(duration));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPopup);
