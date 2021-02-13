import React from "react"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  TextField: {
    width: "100%",
  },

  TextField__input: {
    padding: "5px 0",
  },

  TextField__label: {
    fontSize: 20,
  },
}))

export default function FormControl({
  units,
  defaultValue,
  inputRef,
  error,
  helperText,
  name,
  label,
  type,
}) {
  const classes = useStyles()

  return (
    <TextField
      name={name}
      className={classes.TextField}
      label={label}
      type={type}
      autoComplete="off"
      InputLabelProps={{
        shrink: true,
      }}
      defaultValue={defaultValue}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{units}</InputAdornment>
        ),
        className: classes.TextField__input,
      }}
      InputLabelProps={{
        className: classes.TextField__label,
      }}
      inputRef={inputRef}
      error={error}
      helperText={helperText}
    />
  )
}
