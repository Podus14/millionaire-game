import { useState } from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import PrizeComponent from "./prize-pool";
import { Question } from "@/app/types/question";

type Props = {
  questions: Question[];
  score: number;
};

export default function BurgerMenuComponent({ questions, score }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        className="absolute top-4 right-4 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Image
          src={"/images/menu.svg"}
          alt={"Burger Menu"}
          width={24}
          height={24}
        />
      </button>

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full  bg-[#F5F5F7] transform transition-transform md:hidden",
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
        <div className="mt-[64px]">
          <PrizeComponent questions={questions} score={score} />
        </div>
      </div>
    </>
  );
}
