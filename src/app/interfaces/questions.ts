import { Quiz } from 'src/app/interfaces/quiz';

export interface Questions {
  id: number;
  content: string;
  image: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  quiz: Quiz;
}
