import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASKS,
  SELECT_TASK,
} from "./actionTypes"

const defaultTask = {
  name: "",
  status: "active",
  note: "",
  tagId: 0,
  dueTo: null,
}

export const setTasks = tasks => ({
  type: SET_TASKS,
  payload: tasks,
})

export const addTask = task => ({
  type: ADD_TASK,
  payload: {
    ...defaultTask,
    ...task,
    id: `Task-${Date.now()}`,
    createdAt: new Date(),
    editedAt: new Date(),
  },
})

export const editTask = task => ({
  type: EDIT_TASK,
  payload: task,
})

export const deleteTask = task => ({
  type: DELETE_TASK,
  payload: task.id,
})

export const selectTask = task => ({
  type: SELECT_TASK,
  payload: task,
})
