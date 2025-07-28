import Todo from "../models/todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    if (todos.length === 0)
      return res.status(404).json({ message: "Todos Not Found!" });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { task, category, isDone } = req.body;

    // const presentTasks = await Todo.find();
    // presentTasks.forEach((t) => {
    //   if (t == task)
    //     return res.status(400).json({ message: "Task already exits" });
    // });

    const todo = await Todo.create({ userId, task, category, isDone });
    res.json({ msg: "Product successfully created", todo });
  } catch (error) {
    if (error.code) {
      return res
        .status(400)
        .json({ message: "Task already exits for this user." });
    }
    res.status(500).json({ error: error.message });
  }
};

export const markTodoDone = async (req, res) => {
  try {
    const { isDone } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { isDone },
      { new: true }
    );
    if (!deleted) res.json({ message: "Failed to Update todo!" });
    res.json(updatedTodo);
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
