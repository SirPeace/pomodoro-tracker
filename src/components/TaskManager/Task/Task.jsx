import React from "react";
import classes from "./Task.module.scss";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Task({ task, deleteTask }) {
  const handleTaskDelete = () => {
    deleteTask(task);
  };

  return (
    <div className={classes.Task}>
      <span>{task}</span>

      <DeleteIcon className={classes.deleteIcon} onClick={handleTaskDelete} />
    </div>
  );
}
