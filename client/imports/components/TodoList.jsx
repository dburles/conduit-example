import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem.jsx';

export default class TodoList extends Component {
  noTasks() {
    return <li>No todos</li>;
  }

  loading() {
    return <li>Loading...</li>;
  }

  render() {
    const { todos, ready } = this.props;
    if (! ready) {
      return this.loading();
    }
    if (! todos.length) {
      return this.noTasks();
    }
    return (
      <ul>
        {todos.map(todo => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired
};
