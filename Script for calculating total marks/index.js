import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import quizAnswers from "./quizAnswers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, "/studentSubmissions");
const files = await fs.readdir(folderPath);

await fs.writeFile("results.txt", "");

for (const file of files) {
  const filePath = path.join(folderPath, file);
  const stat = await fs.stat(filePath);

  if (stat.isFile() && file.endsWith(".txt") && file !== "results.txt") {
    const content = await fs.readFile(filePath, "utf-8");
    const studentAnswers = content
      .trim()
      .split(/\r?\n/)
      .map((line) => line.split("-")[1]?.trim().toLocaleLowerCase())
      .filter(Boolean);

    const wrongQuestions = [];
    let score = 0;

    studentAnswers.forEach((ans, i) => {
      if (ans === quizAnswers[i]) {
        score++;
      } else {
        wrongQuestions.push(i + 1);
      }
    });

    // let score = studentAnswers.filter((ans, i) => ans === answers[i]).length;

    const filename = file.split(".")[0];
    const line = `${
      filename.charAt(0).toUpperCase() + filename.slice(1)
    }: ${score}/${quizAnswers.length} | Wrong: ${wrongQuestions.join(", ")}`;
    console.log(line);
    await fs.appendFile("results.txt", line + "\n");
  }
}
