export const SET_TODOS = 'SET_TODOS';
export const TOGGLE_READY = 'TOGGLE_READY';
export const TOGGLE_HIDE_COMPLETED = 'TOGGLE_HIDE_COMPLETED';

export const setTodos = todos => ({ type: SET_TODOS, todos });
export const toggleReady = ready => ({ type: TOGGLE_READY, ready });
export const toggleHideCompleted = checked => ({ type: TOGGLE_HIDE_COMPLETED, checked });
