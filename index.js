const express = require("express");
const { createTodo, completeTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.post("/todo", async (req, res) => {
  const todoPayload = req.body;
  const validTodo = createTodo.safeParse(todoPayload);
  console.log(validTodo, req.body);
  if (validTodo.success) {
    await todo.create({
      title: todoPayload.title,
      description: todoPayload.description,
    });
    res.status(200).json({
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
  console.log(isCompleteValid, req.body.id);
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
