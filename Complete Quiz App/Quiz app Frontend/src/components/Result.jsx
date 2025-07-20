import React from "react";

const Result = ({ QuizQuestions, selectedAnswers }) => {
  const calScore = () => {
    let score = 0;
    QuizQuestions.forEach((qustion, index) => {
      if (selectedAnswers[index] === qustion.answer) {
        score++;
      }
    });
    return score;
  };

  const score = calScore();

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-5">
        Your Score is {score} Out Of {QuizQuestions.length}
      </h1>
      <div>
        {QuizQuestions.map((question, index) => {
          return (
            <div
              key={index}
              className="text-center p-4 m-4 border rounded shadow-md"
            >
              <h1>{question.question}</h1>
              <p>
                Your Answer: {selectedAnswers[index]} -{" "}
                {selectedAnswers[index] == question.answer
                  ? <span className="text-green-700 font-bold">Correct</span>
                  : <span className="text-red-700 font-bold">Incorrect</span>}
              </p>
              {selectedAnswers[index] !== question.answer && (
                <p> Correct Answer - {question.answer} </p>
              )}
            </div>
          );
        })}
      </div>
      <button
        className="px-4 py-3 bg-red-600 text-white font-bold flex justify-center items-center mx-auto rounded hover:bg-red-700"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Play Again!
      </button>
    </div>
  );
};

export default Result;
