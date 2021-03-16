import React from "react"

import { useStyles } from "./styles"
import { PopperContext } from "../TaskManager"

export default function Task({ task, deleteTask }) {
  const classes = useStyles()

  const { anchorEl, setAnchorEl } = React.useContext(PopperContext)

  const handleClick = evt => {
    if (
      evt.button === 2 &&
      evt.currentTarget.dataset.task &&
      evt.currentTarget !== anchorEl
    ) {
      setAnchorEl(evt.currentTarget)
      return
    }

    setAnchorEl(null)
  }

  // const handleTaskDelete = () => {
  //   deleteTask(task)
  // }

  return (
    <>
      <div
        className={classes.Task}
        onMouseDown={handleClick}
        onContextMenu={evt => evt.preventDefault()}
        data-task="task"
      >
        <input type="text" className={classes.taskName} value={task.name} />
      </div>
    </>
  )
}
