import React from "react"
import { connect } from "react-redux"
import DateFnsUtils from "@date-io/date-fns"
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Tooltip,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import DeleteIcon from "@material-ui/icons/Delete"

import { useStyles } from "./styles"
import { editTask, selectTask } from "../../../store/actions/tasks"
import { setPopup } from "../../../store/actions/layout"

const TaskDetails = ({
  selectedTask,
  hideTask,
  openDeletePopup,
  handleNameChange,
  handleNoteChange,
  handleTagChange,
  handleDateChange,
}) => {
  const classes = useStyles()

  if (!selectedTask) return null

  return (
    <div className={classes.TaskDetails}>
      <div className={classes.TaskDetails__header}>
        <Tooltip title="Back to tasks" placement="right">
          <IconButton
            edge="start"
            className={classes.TaskDetails__btn}
            color="inherit"
            onClick={() => hideTask()}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete task" placement="left">
          <IconButton
            edge="start"
            className={classes.TaskDetails__btn}
            color="inherit"
            onClick={openDeletePopup}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>

      <form className={classes.TaskDetails__form}>
        <TextField
          name="name"
          type="text"
          className={classes.TaskDetails__name}
          value={selectedTask.name}
          inputProps={{
            style: { fontWeight: 500, fontSize: 20 },
          }}
          onChange={e => handleNameChange(selectedTask, e.target.value)}
        />

        <TextField
          name="note"
          variant="outlined"
          type="text"
          className={classes.TaskDetails__note}
          value={selectedTask.note}
          placeholder="Note"
          multiline
          rows={5}
          inputProps={{
            className: classes.TaskDetails__noteInput,
          }}
          onChange={e => handleNoteChange(selectedTask, e.target.value)}
        />

        <FormControl className={classes.TaskDetails__tag} variant="outlined">
          <InputLabel id={`Select-Label-${selectedTask.id}`}>Tag</InputLabel>
          <Select
            name="tagId"
            labelId={`Select-Label-${selectedTask.id}`}
            id={`Select-${selectedTask.id}`}
            value={selectedTask.tagId}
            onChange={e => handleTagChange(selectedTask, e.target.value)}
            label="Tag"
          >
            <MenuItem value={0}>No tag</MenuItem>
            <MenuItem value={1}>Homework</MenuItem>
            <MenuItem value={2}>Web Development</MenuItem>
            <MenuItem value={3}>Workout</MenuItem>
          </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            inputVariant="outlined"
            name="dueTo"
            label="Due to"
            value={selectedTask.dueTo}
            format="MMMM dd, yyyy — HH:mm"
            ampm={false}
            onChange={date => handleDateChange(selectedTask, date)}
          />
        </MuiPickersUtilsProvider>
      </form>

      <div className={classes.TaskDetails__footer}></div>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedTask: state.tasks.selectedTask,
})

const mapDispatchToProps = dispatch => ({
  hideTask: () => dispatch(selectTask(null)),
  openDeletePopup: () => dispatch(setPopup("delete-task")),
  handleNameChange: (task, name) => {
    dispatch(
      editTask({
        ...task,
        name,
      })
    )
  },
  handleNoteChange: (task, note) => {
    dispatch(
      editTask({
        ...task,
        note,
      })
    )
  },
  handleTagChange: (task, tagId) => {
    dispatch(
      editTask({
        ...task,
        tagId,
      })
    )
  },
  handleDateChange: (task, dueTo) => {
    dispatch(
      editTask({
        ...task,
        dueTo,
      })
    )
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)
