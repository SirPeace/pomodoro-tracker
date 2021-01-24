import React from "react";
import classes from "./TaskManager.module.scss";
import { connect } from "react-redux";
import TaskForm from "./TaskForm/TaskForm";
import { addTask, deleteTask } from "../../store/actions/tasks";
import Task from "./Task/Task";

function TaskManager({ tasks, addTask, deleteTask }) {
  return (
    <div className={classes.TaskManager}>
      <h2>Tasks Manager</h2>

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
