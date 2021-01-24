import { TextField } from "@material-ui/core";
import React from "react";
import classes from "./TaskForm.module.scss";

export default function TaskForm({ addTask }) {
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
