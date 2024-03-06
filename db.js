const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mongo:1999Sg@cluster0.gelbqey.mongodb.net/TodoDb"
);

const TodoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", TodoSchema);

module.exports = {
  todo,
};
