import React from "react"
import { connect } from "react-redux"
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core"
import { TransitionGroup } from "react-transition-group"

import { addTask } from "../../store/actions/tasks"
import Task from "./Task/Task"
import TaskForm from "./TaskForm/TaskForm"
import PersistentDrawer from "../../hoc/AppShell/PersistentDrawer/PersistentDrawer"
import TaskDetails from "./TaskDetails/TaskDetails"
import { useStyles as useTaskDetailsStyles } from "./TaskDetails/styles"

const useStyles = makeStyles(theme => ({
  TaskManager: {
    padding: 20,
    position: "relative",
  },

  h3: {
    margin: 0,
    fontFamily: "Open Sans",
    color: "#444",
    fontSize: 22,
    userSelect: "none",
  },

  tasks: {
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
}))

export const TasksContext = React.createContext()

function TaskManager({ tasks, addTask, selectedTask }) {
  const classes = useStyles()
  const taskDetailsClasses = useTaskDetailsStyles()

  const sessionTheme = useTheme()

  const [renderMessage, setRenderMessage] = React.useState(true)

  const haveActiveTasks = React.useMemo(
    () => tasks.filter(task => task.status === "active").length > 0,
    [tasks]
  )

  // Render no active tasks message with timeout for animation
  React.useEffect(() => {
    if (!haveActiveTasks && !renderMessage) {
      setTimeout(() => setRenderMessage(true), 900)
    } else if (haveActiveTasks) {
      setRenderMessage(false)
    }
  }, [tasks, renderMessage, setRenderMessage, haveActiveTasks])

  return (
    <ThemeProvider theme={sessionTheme}>
      <PersistentDrawer
        open={!!selectedTask}
        classes={{ paper: taskDetailsClasses.TaskDetails__paper }}
      >
        <TaskDetails />
      </PersistentDrawer>

      <div className={classes.TaskManager}>
        <h3 className={classes.h3}>Tasks</h3>

        <TaskForm addTask={addTask} />

        <ul className={classes.tasks}>
          {renderMessage && (
            <p style={{ marginTop: 15 }}>No active tasks yet...</p>
          )}

          <TransitionGroup>
            {tasks.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </TransitionGroup>
        </ul>
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  selectedTask: state.tasks.selectedTask,
})

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTask(task)),
  // deleteTask: task => dispatch(deleteTask(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskManager)
