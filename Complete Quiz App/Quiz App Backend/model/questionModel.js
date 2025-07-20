import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

const Question = model("Question", questionSchema)

export default Question
