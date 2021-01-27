import React from "react";
import { connect } from "react-redux";
import TaskForm from "./TaskForm/TaskForm";
import { addTask, deleteTask } from "../../store/actions/tasks";
import Task from "./Task/Task";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  TaskManager: {
    padding: 20,
  },

  h2: {
    margin: 0,
  },
}));

function TaskManager({ tasks, addTask, deleteTask }) {
  const classes = useStyles();

  return (
    <div className={classes.TaskManager}>
      <h2 className={classes.h2}>Tasks</h2>

      <TaskForm addTask={addTask} />

      <div className="tasks">
        {tasks.map((task, i) => (
          <Task key={i} task={task} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
});

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTask(task)),
  deleteTask: task => dispatch(deleteTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskManager);
