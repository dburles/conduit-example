import { SET_TODOS, TOGGLE_READY, TOGGLE_HIDE_COMPLETED } from './actions';

const initialState = {
  todos: [],
  hideCompleted: false,
  ready: false,
  limit: 5
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case SET_TODOS:
      return Object.assign({}, state, { todos: action.todos });
    case TOGGLE_READY:
      return Object.assign({}, state, { ready: action.ready });
    case TOGGLE_HIDE_COMPLETED:
      return Object.assign({}, state, { hideCompleted: ! state.hideCompleted });
    default:
      return state;
  }
}
