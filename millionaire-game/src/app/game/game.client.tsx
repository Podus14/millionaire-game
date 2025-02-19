"use client";

import GameOver from "@/app/components/game-over";
import { useState } from "react";
import PrizeComponent from "@/app/components/prize-pool";
import { Question } from "@/app/types/question";
import { useMediaQuery } from "react-responsive";
import BurgerMenuComponent from "@/app/components/burger-menu";
import CurrentQuestionComponent from "../components/current-question";

type Props = {
  questions: Question[];
  checkAnswer: (id: number, text: string) => Promise<boolean>;
};

export default function Page({ questions, checkAnswer }: Props) {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [score, setScore] = useState<number>(0);

  const isMobile = useMediaQuery({ maxWidth: 767 });
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
  return (
    <div className="relative w-full flex flex-col md:flex-row bg-[#F5F5F7] h-screen md:justify-between">
      <BurgerMenuComponent questions={questions} score={score} />

      <div className="md:flex md:flex-col w-full md:pl-[5.5%] md:pr-[10%] md:justify-between md:mt-[133px] md:mb-[122px]">
        <CurrentQuestionComponent currentQuestion={currentQuestion.question} />
        <div className="grid grid-col lg:grid-cols-2 gap-[8px] md:gap-y-[32px] md:gap-x-0 w-full">
          {currentQuestion.answers.map((answer, index) => (
            <div key={answer.text} className="flex items-center ">
              <hr className="w-[17px] bg-[#D0D0D8] flex-shrink-0" />
              <button
                type="submit"
                onClick={() => handleAnswer(currentQuestion.id, answer.text)}
                className="w-full bg-white text-[#1C1C21] text-left text-sm md:text-xl font-normal border border-[#D0D0D8] rounded-xl py-[19px] md:py-[24.5px] px-[23px] md:pl-[32px] md:pr-[49px] leading-[16px]"
              >
                <span className="font-semibold text-[#FF8B37] leading-[16px] mr-[8px]">
                  {letters[index]}
                </span>
                <span className="leading-[16px]">{answer.text}</span>
              </button>
              <hr className="w-[17px] bg-[#D0D0D8] flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
      {!isMobile ? (
        <div className="flex bg-white h-full items-center md:w-[376px] flex-shrink-0">
          <PrizeComponent questions={questions} score={score} />
        </div>
      ) : null}
    </div>
  );
}
