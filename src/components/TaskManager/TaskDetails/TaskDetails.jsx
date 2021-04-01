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
  selectedTask: task,
  tags,
  hideTask,
  openDeletePopup,
  setName,
  setNote,
  setTag,
  setDate,
}) => {
  const classes = useStyles()

  if (!task) return null

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
          value={task.name}
          inputProps={{
            style: { fontWeight: 500, fontSize: 20 },
          }}
          onChange={e => setName(task, e.target.value)}
        />

        <TextField
          name="note"
          variant="outlined"
          type="text"
          className={classes.TaskDetails__note}
          value={task.note}
          placeholder="Note"
          multiline
          rows={5}
          inputProps={{
            className: classes.TaskDetails__noteInput,
          }}
          onChange={e => setNote(task, e.target.value)}
        />

        <FormControl className={classes.TaskDetails__tag} variant="outlined">
          <InputLabel id={`Select-Label-${task.id}`}>Tag</InputLabel>
          <Select
            name="tagId"
            labelId={`Select-Label-${task.id}`}
            id={`Select-${task.id}`}
            value={task.tagIndex}
            onChange={evt => setTag(task, evt.target.value)}
            label="Tag"
          >
            {tags.map((tag, index) => (
              <MenuItem
                value={index}
                className={classes.listItem}
                key={tag.name}
              >
                {tag.name}
                <i
                  className={classes.color}
                  style={{ backgroundColor: tag.color }}
                ></i>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            inputVariant="outlined"
            name="dueTo"
            label="Due to"
            value={task.dueTo}
            format="MMMM dd, yyyy — HH:mm"
            ampm={false}
            disablePast
            onChange={date => setDate(task, date)}
          />
        </MuiPickersUtilsProvider>
        {task.status === "expired" ? (
          <span className={classes.TaskDetails__expirationText}>
            Task expired
          </span>
        ) : null}
      </form>

      <div className={classes.TaskDetails__footer}>
        <p>
          <i>Created at:</i>&nbsp;
          {new Date(task.createdAt).toLocaleString("ru")}
        </p>
        <p>
          <i>Last update:</i>&nbsp;
          {new Date(task.updatedAt).toLocaleString("ru")}
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedTask: state.tasks.selectedTask,
  tags: state.tasks.tags,
})

const mapDispatchToProps = dispatch => ({
  hideTask: () => dispatch(selectTask(null)),
  openDeletePopup: () => dispatch(setPopup("delete-task")),
  setName: (task, name) => {
    dispatch(
      editTask({
        ...task,
        name,
      })
    )
  },
  setNote: (task, note) => {
    dispatch(
      editTask({
        ...task,
        note,
      })
    )
  },
  setTag: (task, tagIndex) => {
    dispatch(
      editTask({
        ...task,
        tagIndex,
      })
    )
  },
  setDate: (task, dueTo) => {
    dispatch(
      editTask({
        ...task,
        dueTo,
        status: "active",
      })
    )
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)
