import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SELECT_TASK,
  SET_TASKS,
} from "../actions/actionTypes"

/**
 * @property {selectedTask[]} tasks
 * @property {number[]} order
 * @property {{
 *  id: number,
 *  name: string,
 *  status: "completed" | "active" | "expired",
 *  note: string,
 *  tagId: number,
 *  createdAt: Date,
 *  editedAt: Date,
 *  dueTo: Date,
 * }} selectedTask
 */
const initialState = {
  tasks: [],
  order: [],
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
