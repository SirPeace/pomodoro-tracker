import React from "react"
import { connect } from "react-redux"
import { CSSTransition } from "react-transition-group"
import CheckIcon from "@material-ui/icons/Check"
import { IconButton } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import { useStyles } from "./styles"
import { editTask, selectTask } from "../../../store/actions/tasks"

function Task({ task, tasks, changeTaskName, selectTask, checkTask }) {
  const classes = useStyles()

  const labelClasses = [classes.Task__checkboxLabel]
  const tickClasses = [classes.Task__checkboxTick]
  const [mount, setMount] = React.useState(
    task.status === "active" || task.status === "expired"
  )

  if (task.status === "completed") {
    labelClasses.push(classes.Task__checkboxLabel_checked)
    tickClasses.push(classes.Task__checkboxTick_checked)
  }

  const handleTaskCheck = () => {
    if (task.status !== "completed") {
      checkTask(task)
    }
  }

  // Unmount task if it's not present in the tasks list
  React.useEffect(() => {
    if (!tasks.find(t => t.id === task.id)) {
      setMount(false)
    }
  }, [tasks, task, setMount])

  return (
    <CSSTransition
      in={mount}
      timeout={300}
      classNames={{
        enter: classes.Task_enter,
        enterActive: classes.Task_enterActive,
        exitActive: classes.Task_exitActive,
      }}
      mountOnEnter
      unmountOnExit
    >
      <li className={classes.Task} data-task="task">
        <div className={classes.Task__checkbox}>
          <input
            type="checkbox"
            name="check"
            id={`${task.id}-check`}
            checked={task.status === "completed"}
            onChange={handleTaskCheck}
            className={classes.Task__checkboxInput}
            hidden
          />
          <label
            htmlFor={`${task.id}-check`}
            className={labelClasses.join(" ")}
            onClick={() => {
              setTimeout(() => setMount(false), 400)
            }}
          ></label>

          <CSSTransition
            in={task.status === "completed"}
            timeout={500}
            classNames={{
              enterActive: classes.Task__checkboxTick_enterActive,
            }}
          >
            <CheckIcon className={tickClasses.join(" ")} />
          </CSSTransition>
        </div>

        <input
          type="text"
          name="task-text"
          placeholder="Task-1"
          autoComplete="off"
          className={classes.Task__name}
          value={task.name}
          onChange={evt => changeTaskName(task, evt.target.value)}
          onFocus={evt => {
            evt.target.parentElement.classList.add(classes.Task_focus)
          }}
          onBlur={evt =>
            evt.target.parentElement.classList.remove(classes.Task_focus)
          }
        />
        <IconButton
          edge="start"
          className={classes.Task__detailsBtn}
          color="inherit"
          onClick={() => selectTask(task)}
        >
          <MoreVertIcon />
        </IconButton>
      </li>
    </CSSTransition>
  )
}

const mapDispatchToProps = dispatch => ({
  changeTaskName: (task, name) =>
    dispatch(
      editTask({
        ...task,
        name,
      })
    ),
  checkTask: task => dispatch(editTask({ ...task, status: "completed" })),
  selectTask: task => dispatch(selectTask(task)),
})

export default connect(
  state => ({ tasks: state.tasks.tasks }),
  mapDispatchToProps
)(Task)
