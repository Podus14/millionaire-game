"use client";

import GameOver from "@/app/components/game-over";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import Image from "next/image";

type Question = {
  id: number;
  question: string;
  answers: {
    text: string;
  }[];
  value: number;
};
type Props = {
  questions: Question[];
  checkAnswer: (id: number, text: string) => Promise<boolean>;
};

export default function Page({ questions, checkAnswer }: Props) {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const letters = ["A", "B", "C", "D"];
  const currentQuestion = questions[questionNumber - 1];

  function handleAnswer(id: number, text: string) {
    checkAnswer(id, text).then((correct) => {
      if (correct) {
        if (questionNumber === questions.length) {
          setQuestionNumber(0);
          return setScore(currentQuestion.value);
        }
        setQuestionNumber(questionNumber + 1);
        return setScore(currentQuestion.value);
      }
      setQuestionNumber(0);
    });
  }

  if (questionNumber === 0) {
    return (
      <GameOver
        totalScore={score}
        onTryAgain={() => {
          setQuestionNumber(1);
          setScore(0);
        }}
      />
    );
  }

  // return (
  //   <div>
  //     <h1>{currentQuestion.question}</h1>
  //     <div className="grid grid-cols-2 gap-4">
  //       {currentQuestion.answers.map((answer) => (
  //         <button
  //           key={answer.text}
  //           onClick={() => handleAnswer(currentQuestion.id, answer.text)}
  //           type="submit"
  //         >
  //           {answer.text}
  //         </button>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className="relative flex flex-col bg-[#F5F5F7] items-center h-screen">
      {/* Бургер-кнопка */}
      <button
        className="absolute top-4 right-4"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Image
          src={"/images/menu.svg"}
          alt={"Burger Menu"}
          width={24}
          height={24}
        />
      </button>

      {/* Боковое меню */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full  bg-[#F5F5F7] transform transition-transform",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={"/images/close.svg"}
            alt={"Close Menu"}
            width={24}
            height={24}
          />
        </button>
        <ul className="mt-[64px] space-y-[8px] text-center">
          {questions
            .slice()
            .reverse()
            .map((question) => (
              <li key={question.id} className="flex items-center ">
                <hr
                  className={cn(
                    "w-[41px] flex-shrink-0",
                    score === question.value
                      ? "border-[#FF8B37]"
                      : "border-[#D0D0D8]"
                  )}
                />
                <div
                  className={cn(
                    "w-full bg-white text-[#1C1C21] font-normal text-sm border border-[#D0D0D8] rounded-xl px-[24px] py-[8px] leading-[16px]",
                    score === question.value
                      ? "text-[#FF8B37] border-[#FF8B37]"
                      : question.value < score
                      ? "text-[#D0D0D8]"
                      : "text-[#1C1C21]"
                  )}
                >
                  ${question.value.toLocaleString()}{" "}
                </div>
                <hr
                  className={cn(
                    "w-[41px] flex-shrink-0",
                    score === question.value
                      ? "border-[#FF8B37]"
                      : "border-[#D0D0D8]"
                  )}
                />
              </li>
            ))}
        </ul>
      </div>

      <h1 className="text-lg font-semibold text-center my-8 leading-[21px] mt-[136px] mb-[97px]">
        {currentQuestion.question}
      </h1>

      <div className="grid grid-col gap-[8px] w-full">
        {currentQuestion.answers.map((answer, index) => (
          <div key={answer.text} className="flex items-center">
            <hr className="w-[17px] bg-[#D0D0D8] flex-shrink-0" />
            <button
              onClick={() => handleAnswer(currentQuestion.id, answer.text)}
              className="w-full bg-white text-[#1C1C21] text-left text-sm font-normal border border-[#D0D0D8] rounded-xl py-[19px] px-[23px] leading-[16px]"
            >
              <span className="font-semibold text-[#FF8B37] text-sm  leading-[16px] mr-[8px]">
                {letters[index]}
              </span>
              <span className="leading-[16px]">{answer.text}</span>
            </button>
            <hr className="w-[17px] bg-[#D0D0D8] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
