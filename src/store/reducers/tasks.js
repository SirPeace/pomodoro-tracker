import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASKS,
} from "../actions/actionTypes"

/**
 * @property {{
 *  id: number,
 *  name: string,
 *  status: "archived" | "active",
 *  note: string,
 *  tagId: number,
 *  createdAt: Date,
 *  editedAt: Date,
 *  dueTo: Date,
 * }[]} tasks
 * @property {number[]} order
 */
const initialState = {
  tasks: [],
  order: [],
}

const handlers = {
  [SET_TASKS]: (state, { payload }) => ({
    ...state,
    tasks: payload,
  }),
  [ADD_TASK]: (state, { payload }) => ({
    ...state,
    tasks: [...state.tasks, payload],
  }),
  [EDIT_TASK]: (state, { payload: { id, data: taskData } }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      id === task.id ? { ...task, taskData } : task
    ),
  }),
  [DELETE_TASK]: (state, { payload }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== payload),
  }),
  DEFAULT: state => state,
}

export function tasksReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
