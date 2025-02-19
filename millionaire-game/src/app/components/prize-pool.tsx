import { cn } from "@/app/lib/utils";
import { Question } from "@/app/types/question";

type Props = {
  questions: Question[];
  score: number;
};

export default function PrizeComponent({ questions, score }: Props) {
  return (
    <ul className="space-y-[8px] text-center md:w-full">
      {questions
        .slice()
        .reverse()
        .map((question) => (
          <li key={question.id} className="flex items-center ">
            <hr
              className={cn(
                "w-[41px] md:w-[69px] flex-shrink-0",
                score === question.value
                  ? "border-[#FF8B37]"
                  : "border-[#D0D0D8]"
              )}
            />
            <div
              className={cn(
                "w-full bg-white text-[#1C1C21] font-normal text-sm md:text-xl border border-[#D0D0D8] rounded-xl px-[24px] py-[8px] leading-[16px]",
                score === question.value
                  ? "text-[#FF8B37] border-[#FF8B37]"
                  : question.value < score
                  ? "text-[#D0D0D8]"
                  : "text-[#1C1C21]"
              )}
            >
              ${question.value.toLocaleString("en-US")}
            </div>
            <hr
              className={cn(
                "w-[41px] md:w-[69px] flex-shrink-0",
                score === question.value
                  ? "border-[#FF8B37]"
                  : "border-[#D0D0D8]"
              )}
            />
          </li>
        ))}
    </ul>
  );
}
