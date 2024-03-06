const express = require("express");
const { createTodo, completeTodo } = require("./types");
const { todo } = require("./db");
const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/todo", async (req, res) => {
  const todo = req.body;
  const validTodo = createTodo.safeParse(todo);
  if (validTodo.success) {
    await todo.create({
      title: todo.title,
      description: todo.description,
    });
    res.json({
      msg: "Todo Created",
    });
  } else {
    res.status(422).json({
      msg: "you sent the wrong inputs",
    });
  }
});

app.get("/todos", async (req, res) => {
  const allTodos = await todo.find({});
  console.log(allTodos);
  res.json({
    todos: allTodos,
  });
});

app.put("/completed", async (req, res) => {
  const completedTodo = req.body;
  const isCompleteValid = completeTodo.safeParse(completedTodo);
  if (isCompleteValid.success) {
    await todo.update(
      {
        _id: req.body.id,
      },
      {
        completed: true,
      }
    );
    res.json({
      msg: "Todo marked as completed",
    });
  } else {
    res.status(422).json({
      msg: "you sent the wrong inputs",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
