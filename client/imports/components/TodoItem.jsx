import React, { Component, PropTypes } from 'react';

export default class TodosListItem extends Component {
  handleChange() {
    Meteor.call('Todos.setChecked', this.props.todo._id);
  }

  handleDelete() {
    Meteor.call('Todos.remove', this.props.todo._id)
  }

  render() {
    const { todo } = this.props;

    return (
      <li className={todo.checked ? 'checked' : ''}>
        <button onClick={this.handleDelete.bind(this)} className="delete">&times;</button>

        <input onChange={this.handleChange.bind(this)} type="checkbox" checked={todo.checked} className="toggle-checked" />

        <span className="text">{todo.text}</span>
      </li>
    );
  }
};

TodosListItem.propTypes = {
  todo: PropTypes.object.isRequired
};
