import { makeStyles, TextField } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles(theme => ({
  TaskForm: {
    marginTop: 10,
    marginBottom: 10,
    position: "relative",
    zIndex: 1700,
  },
}))

export default function TaskForm({ addTask }) {
  const classes = useStyles()
  const [task, setTask] = React.useState("")

  const handleSubmit = event => {
    event.preventDefault()
    if (task.trim().length > 0) {
      addTask({ name: task })
      setTask("")
    }
  }

  return (
    <form className={classes.TaskForm} onSubmit={handleSubmit}>
      <TextField
        fullWidth={true}
        className={classes.TaskInput}
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Add a new task..."
      />
    </form>
  )
}
