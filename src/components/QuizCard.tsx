import React from "react";
import { questionsType } from "../api/Api";

type Props = {
  userAnswer: boolean;
  qNumber: number;
  questions: questionsType[];
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const QuizCard = ({ userAnswer, qNumber, checkAnswer, questions }: Props) => {
  return (
    <div className="px-3">
      <h2
        dangerouslySetInnerHTML={{ __html: questions[qNumber]?.question }}
        className="text-xl text-gray-800 mb-6 font-semibold text-center"
      />

      <div className="flex flex-col mb-6 gap-2 items-center">
        {questions[qNumber]?.allQuestions?.map((ques: string) => (
          <button
            value={ques}
            disabled={userAnswer ? true : false}
            className={`${
              userAnswer
                ? ques === questions[qNumber]?.correct_answer && "bg-green-400"
                : ""
            } bg-sky-400 cursor-pointer w-[80%] py-2 rounded hover:bg-sky-900`}
            onClick={checkAnswer}
            key={ques}
            dangerouslySetInnerHTML={{ __html: ques }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
