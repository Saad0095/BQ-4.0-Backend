import Todo from "../models/todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find(req.params.userId);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.json({ msg: "Product successfully created", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) res.json({ message: "Failed to delete todo!" });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
