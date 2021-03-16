import { ADD_TASK, DELETE_TASK, EDIT_TASK, SET_TASKS } from "./actionTypes"

export const setTasks = tasks => ({
  type: SET_TASKS,
  payload: tasks,
})

export const addTask = task => ({
  type: ADD_TASK,
  payload: task,
})

export const editTask = (id, data) => ({
  type: EDIT_TASK,
  payload: { id, data },
})

export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: id,
})
