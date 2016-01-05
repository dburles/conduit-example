import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import Form from '../components/Form.jsx';
import TodoList from '../components/TodoList.jsx';
import { connect } from 'react-redux';
import Todos from '../../../imports/collections/todos';
import { setTodos, toggleReady } from '../actions';

class App extends Component {
  componentWillMount() {
    const { store } = this.context;

    this.subscriptionEmitter = Tracker.emitter(
      args => Meteor.subscribe('todos', args.limit),
      handle => store.dispatch(toggleReady(handle.ready())),
      () => {
        const { limit } = store.getState();
        return { limit };
      }
    );

    this.tasksEmitter = Tracker.emitter(
      args => {
        const selector = args.hideCompleted
          ? { checked: { $ne: true }}
          : {};
        return Todos.find(selector, { sort: { createdAt: -1 }}).fetch();
      },
      response => store.dispatch(setTodos(response)),
      () => {
        const { hideCompleted } = store.getState();
        return { hideCompleted };
      }
    );

    this.storeSubscriptions = [
      store.subscribe(this.subscriptionEmitter.update),
      store.subscribe(this.tasksEmitter.update),
    ];
  }

  componentWillUnmount() {
    this.subscriptionEmitter.stop(handle => handle.stop());
    this.tasksEmitter.stop(() => store.dispatch(setTodos([])));
    this.storeSubscriptions.forEach(stop => stop());
  }

  render() {
    const { ready, todos, hideCompleted } = this.props;

    return (
      <div className="container">
        <Header hideCompleted={hideCompleted} />
        <Form />
        <TodoList ready={ready} todos={todos} />
      </div>
    );
  }
}

App.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => ({
  ready: state.ready,
  hideCompleted: state.hideCompleted,
  todos: state.todos
});

export default connect(mapStateToProps)(App);
