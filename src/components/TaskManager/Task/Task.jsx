import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "./styles";

export default function Task({ task, deleteTask }) {
  const classes = useStyles();

  const handleTaskDelete = () => {
    deleteTask(task);
  };

  return (
    <div className={classes.Task}>
      <span className={classes.span}>{task}</span>

      <DeleteIcon className={classes.deleteIcon} onClick={handleTaskDelete} />
    </div>
  );
}
