import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import Form from '../components/Form.jsx';
import TodoList from '../components/TodoList.jsx';
import { connect } from 'react-redux';
import Todos from '../../../imports/collections/todos';
import { setTodos, toggleReady } from '../actions';
import { conduit } from 'meteor/dburles:conduit';

class App extends Component {
  componentWillMount() {
    const { store } = this.context;

    this.subscriptionConduit = conduit
      .input(() => {
        const { limit } = store.getState();
        return { limit };
      })
      .source(({ limit }) => Meteor.subscribe('todos', limit))
      .output(source => store.dispatch(toggleReady(source.ready())));

    this.tasksConduit = conduit
      .input(() => {
        const { hideCompleted } = store.getState();
        return { hideCompleted };
      })
      .source(args => {
        const selector = args.hideCompleted
          ? { checked: { $ne: true }}
          : {};
        return Todos.find(selector, { sort: { createdAt: -1 }}).fetch();
      })
      .output(response => store.dispatch(setTodos(response)));

    this.storeSubscriptions = [
      store.subscribe(this.subscriptionConduit.update),
      store.subscribe(this.tasksConduit.update),
    ];
  }

  componentWillUnmount() {
    const { store } = this.context;
    this.subscriptionConduit.stop(handle => handle.stop());
    this.tasksConduit.stop(() => store.dispatch('setTodos', []));
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
