import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleHideCompleted } from '../actions';

export default class Header extends Component {
  handleHideCompleted() {
    const { store } = this.context;
    store.dispatch(toggleHideCompleted());
  }

  render() {
    const { onSetHideCompleted, hideCompleted } = this.props;

    return (
      <header>
        <h1>Todo List</h1>

        <label className="hide-completed">
          <input onChange={this.handleHideCompleted.bind(this)} type="checkbox" checked={hideCompleted} />
          Hide Completed Tasks
        </label>
      </header>
    );
  }
}

Header.propTypes = {
  hideCompleted: PropTypes.bool.isRequired
};

Header.contextTypes = {
  store: React.PropTypes.object
};
