import { useState } from "react";
import { FetchQuiz, questionsType } from "./api/Api";
import QuizCard from "./components/QuizCard";

function App() {
  const Total = 10;
  const [questions, setQuestions] = useState<questionsType[]>([]);
  const [laoding, setLoading] = useState(false);
  const [qNember, setQNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswers] = useState(false);
  const [start, setStart] = useState(true);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userChoice = e.currentTarget.value;
    const correct_answer = questions[qNember].correct_answer;
    setUserAnswers(true);
    if (userChoice === correct_answer) {
      setScore((prev) => prev + 1);

      e.currentTarget.style.backgroundColor = "green";
    } else {
      e.currentTarget.style.backgroundColor = "red";
    }

    setTimeout(() => {
      setQNumber((prev) => prev + 1);
      setUserAnswers(false);
      if (qNember + 1 === Total) {
        setStart(true);
        setQNumber(0);
      }
    }, 1500);
  };
  const startQuiz = async () => {
    setLoading(true);
    const quizzes = await FetchQuiz();
    setQuestions(quizzes);
    setLoading(false);
    setStart(false);
    setScore(0);
    setQNumber(0);
  };

  return (
    <div className="h-screen  bg-gradient-to-br from-blue-500 to-lime-400 flex justify-center items-center">
      <div className="max-w-xl min-h-[400px] w-[700px] mx-auto bg-white/20 backdrop-blur-20 drop-shadow-xl">
        <h1 className="text-2xl font-bold text-center py-3 text-slate-700">
          TypeScript Quiz
        </h1>
        <div className="flex justify-between items-center">
          <p
            className="py-2 px-8
            text-gray-700"
          >
            Score: <span className="text-rose-500 font-bold">{score}</span>
          </p>
          <p className="py-2 px-8">
            {qNember + 1} / <b>{Total}</b>
          </p>
        </div>
        {start && (
          <div className="flex justify-center py-3 ">
            <button
              className="bg-sky-500 rounded py-2 cursor-pointer hover:bg-sky-700 transition px-4 text-white"
              onClick={startQuiz}
            >
              Star
            </button>
          </div>
        )}
        {!start && (
          <QuizCard
            userAnswer={userAnswer}
            qNumber={qNember}
            checkAnswer={checkAnswer}
            questions={questions}
          />
        )}
      </div>
    </div>
  );
}

export default App;
