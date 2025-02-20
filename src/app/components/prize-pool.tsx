import { cn } from "@/app/lib/utils";
import { Question } from "@/app/types/question";

type Props = {
  questions: Question[];
  score: number;
};

export default function PrizeComponent({ questions, score }: Props) {
  return (
    <ul className="space-y-[8px] text-center md:w-full">
      {[...questions].reverse().map((question) => (
        <li key={question.id} className="flex items-center ">
          <hr
            className={cn(
              "w-[41px] md:w-[69px] flex-shrink-0",
              score === question.value ? "border-accentOrange" : "border-gray1"
            )}
          />
          <div
            className={cn(
              "w-full bg-white font-normal text-sm md:text-xl border  rounded-xl px-[24px] py-[8px] leading-[16px]",
              score === question.value
                ? "text-accentOrange border-accentOrange"
                : question.value < score
                  ? "text-gray1 border-gray1"
                  : "text-dark border-gray1"
            )}
          >
            ${question.value.toLocaleString("en-US")}
          </div>
          <hr
            className={cn(
              "w-[41px] md:w-[69px] flex-shrink-0",
              score === question.value ? "border-accentOrange" : "border-gray1"
            )}
          />
        </li>
      ))}
    </ul>
  );
}
