type Props = {
  currentQuestion: string;
};

export default function CurrentQuestionComponent({ currentQuestion }: Props) {
  return (
    <h1 className="text-lg md:text-[32px] text-[#171717] font-semibold text-center md:text-left mx-[16px] md:w-[74%] my-8 leading-[21px] md:leading-[37px] mt-[136px]  md:mt-[0] md:mb-[0]">
      {currentQuestion}
    </h1>
  );
}
