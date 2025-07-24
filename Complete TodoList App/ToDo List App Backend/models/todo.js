import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    userId: String,
    task: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);
export default Todo;
