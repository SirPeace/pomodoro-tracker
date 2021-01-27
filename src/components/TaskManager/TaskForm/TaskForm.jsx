import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  marginTop: 10,
  marginBottom: 20,
}));

export default function TaskForm({ addTask }) {
  const classes = useStyles();
  const [task, setTask] = React.useState("");

  const handleSubmit = event => {
    event.preventDefault();
    addTask(task);
  };

  return (
    <form className={classes.TaskForm} onSubmit={handleSubmit}>
      <TextField
        fullWidth={true}
        className={classes.TaskInput}
        value={task}
        onChange={e => setTask(e.target.value)}
      />
    </form>
  );
}
