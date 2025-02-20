"use client";

import GameOver from "@/app/components/game-over";
import { useState } from "react";
import PrizeComponent from "@/app/components/prize-pool";
import { Question } from "@/app/types/question";
import BurgerMenuComponent from "@/app/components/burger-menu";
import CurrentQuestionComponent from "@/app/components/current-question";
import CurrentAnswersComponent from "@/app/components/current-answers";
import useIsMobile from "@/app/hooks/useIsMobile";

type Props = {
  questions: Question[];
  checkAnswer: (id: number, text: string) => Promise<boolean>;
};

export default function Page({ questions, checkAnswer }: Props) {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const isMobile = useIsMobile();
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
    <div className="relative w-full flex flex-col md:flex-row bg-grayBg h-screen md:justify-between">
      <BurgerMenuComponent questions={questions} score={score} />

      <div className="md:flex md:flex-col w-full md:pl-[5.5%] md:pr-[10%] md:justify-between md:mt-[133px] md:mb-[122px]">
        <CurrentQuestionComponent currentQuestion={currentQuestion.question} />
        <CurrentAnswersComponent
          currentQuestion={currentQuestion}
          letters={letters}
          handleAnswer={handleAnswer}
          checkAnswer={checkAnswer}
        />
      </div>
      {!isMobile ? (
        <div className="flex bg-white h-full items-center md:w-[376px] flex-shrink-0">
          <PrizeComponent questions={questions} score={score} />
        </div>
      ) : null}
    </div>
  );
}
