export default Todos = new Mongo.Collection('todos');

Meteor.methods({
  'Todos.add'(text) {
    check(text, String);
    Todos.insert({ text, createdAt: new Date() });
  },
  'Todos.setChecked'(id) {
    check(id, String);
    const task = Todos.findOne(id, { fields: { checked: true }});
    Todos.update(id, { $set: { checked: ! task.checked }});
  },
  'Todos.remove'(id) {
    check(id, String);
    Todos.remove(id);
  }
});
