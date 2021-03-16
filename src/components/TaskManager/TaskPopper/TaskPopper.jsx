import React from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { colors } from "@material-ui/core"
import { Fade, Paper, Popper } from "@material-ui/core"
import { useStyles } from "./styles.js"
import { connect } from "react-redux"
import { PopperContext } from "../TaskManager.jsx"

const TaskPopper = ({ id, tasksOpen }) => {
  const classes = useStyles()

  const { anchorEl, setAnchorEl } = React.useContext(PopperContext)

  const popperRef = React.createRef()

  React.useEffect(() => {
    const popperEl = popperRef.current?.popper
    if (popperEl) popperEl.classList.add(classes.Popper)
  }, [popperRef, classes])

  React.useEffect(() => {
    if (!tasksOpen) setAnchorEl(null)
  }, [tasksOpen, setAnchorEl])

  return (
    <Popper
      anchorEl={anchorEl}
      id={id}
      open={!!anchorEl}
      popperRef={popperRef}
      keepMounted
      transition
      placement="bottom-end"
    >
      {({ TransitionProps }) => (
        <Fade timeout={200} {...TransitionProps}>
          <Paper className={classes.Popper__paper}>
            <button className={classes.Popper__button}>
              <DeleteIcon
                className={classes.Popper__icon}
                style={{ color: colors.red[900] }}
              />{" "}
              Delete
            </button>
            <button className={classes.Popper__button}>
              <EditIcon className={classes.Popper__icon} /> Edit
            </button>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}

const mapStateToProps = state => ({
  tasksOpen: (() => {
    const pers_drawer = state.layout.persistant_drawer
    return pers_drawer ? pers_drawer.startsWith("tasks") : false
  })(),
})

export default connect(mapStateToProps)(TaskPopper)
