import { Paper, Grid, Button } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import React from "react"
import { connect } from "react-redux"
import { useStyles } from "./styles"
import { setPopup } from "../../store/actions/layout"
import { setConfiguration } from "../../store/actions/sessions"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import FormControl from "./FormControl/FormControl"

function SettingsPopup({
  shortBreakDuration,
  longBreakDuration,
  workSessionDuration,
  workSessionsCountBeforeLongBreak,

  closePopup,
  setConfiguration,
}) {
  const classes = useStyles()

  const schema = yup.object().shape({
    work_session: yup
      .number()
      .transform((v, ov) => (ov === "" ? undefined : v))
      .integer("Must be an integer")
      .positive("Must be a positive number")
      .moreThan(19, "Must be equal or more than 20")
      .lessThan(121, "Must be equal or less than 120")
      .required("Must be filled"),

    short_break: yup
      .number()
      .transform((v, ov) => (ov === "" ? undefined : v))
      .integer("Must be an integer")
      .positive("Must be a positive number")
      .moreThan(4, "Must be equal or more than 5")
      .lessThan(31, "Must be equal or less than 30")
      .required("Must be filled"),

    long_break: yup
      .number()
      .transform((v, ov) => (ov === "" ? undefined : v))
      .integer("Must be an integer")
      .positive("Must be a positive number")
      .moreThan(9, "Must be equal or more than 10")
      .lessThan(61, "Must be equal or less than 60")
      .required("Must be filled"),

    work_sessions_before_long_break: yup
      .number()
      .transform((v, ov) => (ov === "" ? undefined : v))
      .integer("Must be an integer")
      .positive("Must be a positive number")
      .moreThan(1, "Must be equal or more than 2")
      .lessThan(11, "Must be equal or less than 10")
      .required("Must be filled"),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = (data, event) => {
    event.preventDefault()

    // TODO: Save settings to the state
    setConfiguration({
      workSessionDuration: data.work_session,
      shortBreakDuration: data.short_break,
      longBreakDuration: data.long_break,
      workSessionsCountBeforeLongBreak: data.work_sessions_before_long_break,
    })

    closePopup()
  }

  return (
    <Paper elevation="1" className={classes.SettingsPopup} id="settings-popup">
      <header className={classes.header}>
        <CloseIcon
          className={classes.closeIcon}
          onClick={closePopup.bind(null)}
        />
      </header>

      <form className={classes.body} onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl
              name="work_session"
              label="Work Session"
              type="number"
              defaultValue={workSessionDuration}
              inputRef={register}
              error={errors.work_session}
              helperText={errors.work_session?.message}
              units="Minutes"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              name="short_break"
              label="Short break"
              type="number"
              defaultValue={shortBreakDuration}
              inputRef={register}
              error={errors.short_break}
              helperText={errors.short_break?.message}
              units="Minutes"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              name="long_break"
              label="Long break"
              type="number"
              defaultValue={longBreakDuration}
              inputRef={register}
              error={errors.long_break}
              helperText={errors.long_break?.message}
              units="Minutes"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              name="work_sessions_before_long_break"
              label="Work sessions before long break"
              type="number"
              defaultValue={workSessionsCountBeforeLongBreak}
              inputRef={register}
              error={errors.work_sessions_before_long_break}
              helperText={errors.work_sessions_before_long_break?.message}
              units="Count"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Save changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

const mapStateToProps = state => ({
  shortBreakDuration: state.sessions.configuration.shortBreakDuration,
  longBreakDuration: state.sessions.configuration.longBreakDuration,
  workSessionDuration: state.sessions.configuration.workSessionDuration,
  workSessionsCountBeforeLongBreak:
    state.sessions.configuration.workSessionsCountBeforeLongBreak,
})

const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(setPopup(false)),
  setConfiguration: configuration => dispatch(setConfiguration(configuration)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPopup)
