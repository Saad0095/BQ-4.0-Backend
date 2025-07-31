import Todo from "../models/todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { task, category } = req.body;
    console.log({ userId, task, category });

    const todo = await Todo.create({ userId, task, category });
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
    const todo = await Todo.findById(req.params.id);
    const isDone = !todo.isDone;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { isDone },
      { new: true }
    );
    if (!updatedTodo) return res.json({ message: "Failed to Update todo!" });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.json({ message: "Failed to delete todo!" });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
