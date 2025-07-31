import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: String, required: true },
    category: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

todoSchema.index({ userId: 1, task: 1 }, { unique: true });

const Todo = model("Todo", todoSchema);
export default Todo;
