import { ADD_TASK, DELETE_TASK } from "../actions/actionTypes";

const initialState = {
  tasks: [],
};

const handlers = {
  [ADD_TASK]: (state, { payload }) => ({
    ...state,
    tasks: [...state.tasks, payload],
  }),
  [DELETE_TASK]: (state, { payload }) => ({
    ...state,
    tasks: state.tasks.filter(v => v !== payload),
  }),
  DEFAULT: state => state,
};

export function tasksReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
}
