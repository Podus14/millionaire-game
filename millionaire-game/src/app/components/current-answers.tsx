import { useState } from "react";
import { Question } from "../types/question";

type Props = {
  currentQuestion: Question;
  letters: string[];
  handleAnswer: (id: number, text: string) => void;
  checkAnswer: (id: number, text: string) => Promise<boolean>;
};

export default function CurrentAnswersComponent({
  currentQuestion,
  letters,
  handleAnswer,
  checkAnswer,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<
    "correct" | "wrong" | "pending" | null
  >(null);
  const [hoveredAnswer, setHoveredAnswer] = useState<string | null>(null);

  async function handleClick(answerText: string) {
    if (selectedAnswer) return;

    setSelectedAnswer(answerText);
    setAnswerStatus("pending");

    const isCorrect = await checkAnswer(currentQuestion.id, answerText);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAnswerStatus(isCorrect ? "correct" : "wrong");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSelectedAnswer(null);
    setAnswerStatus(null);
    handleAnswer(currentQuestion.id, answerText);
  }

  return (
    <div className="grid grid-col lg:grid-cols-2 gap-[8px] md:gap-y-[32px] md:gap-x-0 w-full">
      {currentQuestion.answers.map((answer, index) => {
        const isSelected = selectedAnswer === answer.text;
        const isHovered = !selectedAnswer && hoveredAnswer === answer.text;

        let bgColor = "bg-white";
        let borderHrColor = "border-[#D0D0D8]";
        let borderColor = "border-[#D0D0D8]";

        if (isSelected) {
          if (answerStatus === "pending") {
            bgColor = "bg-[#FFF3EB]";
            borderHrColor = "border-[#FF8B37]";
            borderColor = "border-[#FF8B37]";
          } else if (answerStatus === "correct") {
            bgColor = "bg-[#E6FAEA]";
            borderHrColor = "border-[#47D867]";
            borderColor = "border-[#47D867]";
          } else if (answerStatus === "wrong") {
            bgColor = "bg-[#FDEEED]";
            borderHrColor = "border-[#EC6259]";
            borderColor = "border-[#EC6259]";
          }
        }

        if (isHovered) {
          borderHrColor = "border-[#FF8B37]";
          borderColor = "border-[#FF8B37]";
        }

        return (
          <div key={answer.text} className="flex items-center">
            <hr
              className={`w-[17px] ${borderHrColor} flex-shrink-0 transition-colors`}
            />
            <button
              type="button"
              onClick={() => handleClick(answer.text)}
              onMouseEnter={() => setHoveredAnswer(answer.text)}
              onMouseLeave={() => setHoveredAnswer(null)}
              className={`w-full text-[#1C1C21] text-left text-sm md:text-xl font-normal rounded-xl py-[19px] md:py-[24.5px] px-[23px] md:pl-[32px] md:pr-[49px] leading-[16px] transition-colors border 
                  ${bgColor} ${borderColor}`}
              disabled={!!selectedAnswer}
            >
              <span className="font-semibold text-[#FF8B37] leading-[16px] mr-[8px]">
                {letters[index]}
              </span>
              <span className="leading-[16px]">{answer.text}</span>
            </button>
            <hr
              className={`w-[17px] ${borderHrColor} flex-shrink-0 transition-colors`}
            />
          </div>
        );
      })}
    </div>
  );
}
