import questions from "@/data/questions.json";
import PageClient from "./game.client";
export default function Page() {
  const questionsWithoutAnswers = questions.questions.map((question) => {
    return {
      ...question,
      answers: question.answers.map((answer) => ({ text: answer.text })),
    };
  });

  async function checkAnswer(id: number, text: string): Promise<boolean> {
    "use server";
    const question = questions.questions.find((q) => q.id === id);
    if (!question) return false;
    const answer = question.answers.find((a) => a.text === text);
    return answer?.correct || false;
  }

  return (
    <PageClient questions={questionsWithoutAnswers} checkAnswer={checkAnswer} />
  );
}
