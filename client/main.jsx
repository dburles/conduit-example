import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import todos from './imports/reducers';
import App from './imports/containers/App.jsx';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware
)(createStore);

const store = createStoreWithMiddleware(todos);

Meteor.startup(() =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
);
