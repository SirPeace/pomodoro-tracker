import React from "react"
import { connect } from "react-redux"
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core"

import { addTask, deleteTask } from "../../store/actions/tasks"
import Task from "./Task/Task"
import TaskForm from "./TaskForm/TaskForm"
import TaskPopper from "./TaskPopper/TaskPopper"

const useStyles = makeStyles(theme => ({
  TaskManager: {
    padding: 20,
    position: "relative",
    zIndex: 1700,
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

export const PopperContext = React.createContext()

function TaskManager({ tasks, addTask, deleteTask }) {
  const classes = useStyles()

  const sessionTheme = useTheme()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const popperId = !!anchorEl ? `Task-Popper-${Date.now()}` : undefined

  return (
    <ThemeProvider theme={sessionTheme}>
      <PopperContext.Provider value={{ anchorEl, setAnchorEl }}>
        <div className={classes.TaskManager}>
          <h3 className={classes.h3}>Tasks</h3>

          <TaskForm addTask={addTask} />

          <div className={classes.tasks} aria-describedby={popperId}>
            {tasks.length > 0
              ? tasks.map((task, i) => (
                  <Task key={i} task={task} deleteTask={deleteTask} />
                ))
              : "No tasks yet"}

            <TaskPopper id={popperId} />
          </div>
        </div>
      </PopperContext.Provider>
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
