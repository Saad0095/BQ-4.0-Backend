import fs from "fs/promises";
import path from "path";

const folderPath =
  "E:\\Web Development (Coding)\\BQ 4.0 WD - 3 (Backend)\\Script for calculating total marks";
const files = await fs.readdir(folderPath);

await fs.writeFile("results.txt", "");
const answers = [
  "A",
  "C",
  "B",
  "B",
  "B",
  "C",
  "B",
  "B",
  "B",
  "B",
  "C",
  "B",
  "C",
  "C",
  "C",
  "A",
  "C",
  "B",
  "B",
  "B",
  "C",
  "C",
  "B",
  "A",
  "B",
  "B",
  "B",
  "B",
  "B",
  "C",
  "B",
  "B",
  "C",
];

for (const file of files) {
  const filePath = path.join(folderPath, file);
  const stat = await fs.stat(filePath);

  if (
    stat.isFile() &&
    file.endsWith(".txt") &&
    file !== "results.txt"
  ) {
    const content = await fs.readFile(filePath, "utf-8");
    const studentAnswers = content
      .trim()
      .split(/\r?\n/)
      .map((line) => line.split("-")[1]?.trim().toUpperCase())
      .filter(Boolean);

    let score = studentAnswers.filter((ans, i) => ans == answers[i]).length;

    const filename = file.split(".")[0];
    const line = `${
      filename.charAt(0).toUpperCase() + filename.slice(1)
    }: ${score}/${answers.length}`;
    console.log(line);
    await fs.appendFile("results.txt", line + "\n");
  }
}
