import React from "react"
import { connect } from "react-redux"
import { CSSTransition } from "react-transition-group"
import CheckIcon from "@material-ui/icons/Check"
import { colors, IconButton } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import ScheduleIcon from "@material-ui/icons/Schedule"
import { useMediaQuery } from "react-responsive"

import { useStyles } from "./styles"
import { editTask, selectTask } from "../../../store/actions/tasks"

function Task({
  task,
  tasks,
  tags,
  changeTaskName,
  selectTask,
  checkTask,
  expireTask,
}) {
  const classes = useStyles()

  const labelClasses = [classes.Task__checkboxLabel]
  const tickClasses = [classes.Task__checkboxTick]
  const [mount, setMount] = React.useState(
    task.status === "active" || task.status === "expired"
  )

  if (task.status === "completed") {
    labelClasses.push(classes.Task__checkboxLabel_checked)
  }

  const handleTaskCheck = () => {
    if (task.status !== "completed") {
      checkTask(task)
    }
  }

  // Unmount deleted tasks
  React.useEffect(() => {
    if (!tasks.find(t => t.id === task.id)) {
      setMount(false)
    }
  }, [tasks, task, setMount])

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  const listItemProps = {}
  if (isMobile) {
    const handleClick = evt => {
      if (!evt.target.matches("label")) {
        selectTask(task)
      }
    }

    listItemProps.onMouseUp = handleClick
  }

  // Check if the current task is expired once a minute
  React.useEffect(() => {
    const checkTaskExpiration = () => {
      if (task?.dueTo instanceof Date) {
        if (task.dueTo.getTime() <= new Date().getTime()) {
          expireTask(task)
        }
      }
    }

    let interval
    if (task.status !== "expired" && task.status !== "completed") {
      checkTaskExpiration()

      interval = setInterval(() => {
        checkTaskExpiration()
      }, 1000 * 10)
    }

    return () => clearInterval(interval)
  }, [task, expireTask])

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
      <li className={classes.Task} data-task="task" {...listItemProps}>
        <i
          className={classes.tagLabel}
          style={{ backgroundColor: tags[task.tagIndex].color }}
        ></i>
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

        {isMobile ? (
          <span className={classes.Task__name}>{task.name}</span>
        ) : (
          <>
            <input
              type="text"
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
          </>
        )}
        {task.status === "expired" ? (
          <ScheduleIcon style={{ color: colors.red[400] }} />
        ) : null}
      </li>
    </CSSTransition>
  )
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  tags: state.tasks.tags,
})

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
  expireTask: task => dispatch(editTask({ ...task, status: "expired" }, true)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)
