import { Quiz } from 'src/app/interfaces/quiz';


export interface Question {
  id: number;
  content: string;
  image: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  givenAnswer:string;
  quiz: Quiz;
}
