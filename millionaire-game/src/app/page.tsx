"use client";

import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-[24px] md:gap-[2.5%] px-[5%] md:px-[5.5%]">
        <div className="w-full h-auto">
          <Image
            src={
              isMobile ? "/images/hand-mobile.svg" : "/images/hand-desktop.svg"
            }
            alt="Thumbs up"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
        <div className="w-full text-center md:text-left">
          <h2 className="text-[32px] md:text-[56px]  font-semibold text-[#1C1C21] leading-[37px] md:leading-[65px] mb-[102px] md:mb-[65px]">
            Who wants to be a millionaire?
          </h2>
          <Link
            href="/game"
            className="inline-block bg-[#FF8B37] font-semibold rounded-lg md:rounded-xl text-white text-center text-sm md:text-xl w-[288px] md:w-[296px] px-[24px] py-[16px] md:py-[21px] hover:bg-[#FFAC70] active:bg-[#E87928]"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}
