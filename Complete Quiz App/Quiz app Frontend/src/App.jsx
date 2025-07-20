import { useEffect, useState } from "react";
import Questions from "./components/Questions";
import Result from "./components/Result";
import axios from "axios";
import Loading from "./components/Loading";

function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(
    () => JSON.parse(localStorage.getItem("currentQuestion")) || 0
  );
  const [selectedAnswers, setSelectedAnswers] = useState(
    () => JSON.parse(localStorage.getItem("selectedAnswers")) || {}
  );
  const [isSubmitted, setIsSubmitted] = useState(
    () => JSON.parse(localStorage.getItem("isSubmitted")) || false
  );
  const [error, setError] = useState(null);

  const fetchQuizQuestions = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/questions");
      setQuizQuestions(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch quiz questions. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    localStorage.setItem("isSubmitted", JSON.stringify(isSubmitted));
  }, [currentQuestion, isSubmitted, selectedAnswers]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answer });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    localStorage.clear();
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const progressPercentage = Math.round(
    ((currentQuestion + 1) / quizQuestions.length) * 100
  );

  if (quizQuestions.length === 0 && !error) return <Loading />;
  if (error)
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchQuizQuestions}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-4 min-h-screen flex flex-col justify-center bg-purple-200">
      <div className="w-full sm:w-2/3 lg:w-1/2 mx-auto shadow-xl shadow-gray-500 bg-gray-50 rounded p-10">
        <div className="w-full h-2 bg-gray-200 rounded mb-4">
          <div
            className="h-full bg-purple-600 rounded"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {!isSubmitted ? (
          <div>
            <Questions
              quizQuestion={quizQuestions[currentQuestion]}
              currentQuestion={currentQuestion}
              totalQuestions={quizQuestions.length}
              onAnswerSelect={handleAnswerSelect}
              selectedAnswer={selectedAnswers[currentQuestion]}
            />

            <div className="flex justify-between mt-5">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={
                  currentQuestion === 0
                    ? "bg-gray-300 px-4 py-3 rounded cursor-not-allowed opacity-50"
                    : "bg-purple-600 text-white px-4 py-3 font-bold rounded"
                }
              >
                Previous
              </button>

              {currentQuestion < quizQuestions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestion]}
                  className={
                    !selectedAnswers[currentQuestion]
                      ? "bg-purple-600 px-4 py-3 rounded text-white opacity-70 cursor-not-allowed"
                      : "bg-purple-600 px-4 py-3 rounded text-white font-bold"
                  }
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswers[currentQuestion]}
                  className={
                    !selectedAnswers[currentQuestion]
                      ? "bg-green-500 px-4 py-3 rounded text-white opacity-70 cursor-not-allowed"
                      : "bg-green-500 px-4 py-3 rounded text-white font-bold"
                  }
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ) : (
          <Result
            QuizQuestions={quizQuestions}
            selectedAnswers={selectedAnswers}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;
