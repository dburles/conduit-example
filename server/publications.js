import Todos from '../imports/collections/todos';

Meteor.publish('todos', function(limit) {
  check(limit, Number);
  Meteor._sleepForMs(1000);
  return Todos.find();
});
