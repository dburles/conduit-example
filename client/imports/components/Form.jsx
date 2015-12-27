import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Form extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.task).value;
    Meteor.call('Todos.add', text);
    ReactDOM.findDOMNode(this.refs.task).value = '';
  }

  render() {
    return (
      <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
        <input autoComplete="off" ref="task" type="text" name="text" placeholder="Type to add new tasks" />
      </form>
    );
  }
};
