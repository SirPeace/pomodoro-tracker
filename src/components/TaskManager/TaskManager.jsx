import React from "react"
import { connect } from "react-redux"
import TaskForm from "./TaskForm/TaskForm"
import { addTask, deleteTask } from "../../store/actions/tasks"
import Task from "./Task/Task"
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  TaskManager: {
    padding: 20,
  },

  h3: {
    margin: 0,
    fontFamily: "Open Sans",
    color: "#444",
    fontSize: 22,
    userSelect: "none",
  },

  tasks: {},
}))

function TaskManager({ tasks, addTask, deleteTask }) {
  const classes = useStyles()

  const sessionTheme = useTheme()

  return (
    <ThemeProvider theme={sessionTheme}>
      <div className={classes.TaskManager}>
        <h3 className={classes.h3}>Tasks</h3>

        <TaskForm addTask={addTask} />

        <div className={classes.tasks}>
          {tasks.map((task, i) => (
            <Task key={i} task={task} deleteTask={deleteTask} />
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
})

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTask(task)),
  deleteTask: task => dispatch(deleteTask(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskManager)
