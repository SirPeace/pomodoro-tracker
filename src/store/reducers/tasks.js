import { colors } from "@material-ui/core"
import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SELECT_TASK,
  SET_TASKS,
} from "../actions/actionTypes"

/**
 * @property {selectedTask[]} tasks
 * @property {{
 *  name: string,
 *  color: string
 * }[]} tags
 * @property {{
 *  id: number,
 *  name: string,
 *  status: "completed" | "active" | "expired",
 *  note: string,
 *  tagId: number,
 *  createdAt: Date,
 *  updatedAt: Date,
 *  dueTo: Date,
 * }} selectedTask
 */
const initialState = {
  tasks: [],
  tags: [
    { color: "transparent", name: "" },
    { color: "#e57373", name: "Meeting" },
    { color: colors.blue[400], name: "Long-term goal" },
    { color: colors.green[400], name: "Habit" },
  ],
  selectedTask: null,
}

const handlers = {
  [SET_TASKS]: (state, { payload: tasks }) => ({
    ...state,
    tasks,
  }),
  [ADD_TASK]: (state, { payload: task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  }),
  [EDIT_TASK]: (state, { payload: updatedTask }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ),
    selectedTask:
      state.selectedTask && updatedTask.id === state.selectedTask.id
        ? updatedTask
        : state.selectedTask,
  }),
  [DELETE_TASK]: (state, { payload: taskID }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskID),
  }),
  [SELECT_TASK]: (state, { payload: selectedTask }) => ({
    ...state,
    selectedTask,
  }),
  DEFAULT: state => state,
}

export function tasksReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
