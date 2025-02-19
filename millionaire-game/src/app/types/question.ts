export type Question = {
  id: number;
  question: string;
  answers: {
    text: string;
  }[];
  value: number;
};
