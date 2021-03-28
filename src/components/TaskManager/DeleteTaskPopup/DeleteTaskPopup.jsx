import React from "react"
import { Paper, Button } from "@material-ui/core"
import { connect } from "react-redux"
import { setPopup } from "../../../store/actions/layout"
import { useStyles } from "./styles"
import { deleteTask, selectTask } from "../../../store/actions/tasks"

function DeleteTaskPopup({ selectedTask, hideTask, deleteTask, closePopup }) {
  const classes = useStyles()

  const handleAccept = () => {
    hideTask()
    deleteTask(selectedTask)
    closePopup()
  }

  return (
    <Paper elevation={1} className={classes.body} id="delete-task-popup">
      <h3 className={classes.message}>
        Do you want to delete the <u>{selectedTask.name}</u> task?
      </h3>

      <Button
        onClick={handleAccept}
        variant="contained"
        className={`${classes.acceptButton} ${classes.button}`}
      >
        Yes
      </Button>

      <Button
        onClick={closePopup}
        variant="contained"
        className={`${classes.dismissButton} ${classes.button}`}
      >
        No
      </Button>
    </Paper>
  )
}

const mapStateToProps = state => ({
  selectedTask: state.tasks.selectedTask,
})

const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(setPopup(false)),
  hideTask: () => dispatch(selectTask(null)),
  deleteTask: task => dispatch(deleteTask(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTaskPopup)
