import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  constructor(private quizService:QuizService) {
  }

  quizzes:Array<Quiz>=[];


  getQuiz(){
    this.quizService.getQuizes().subscribe(
      (response:any)=>{
        this.quizzes=response;
        console.log(this.quizzes);
        
      },
      (error)=>{
        console.log(error.error.value);
        
      }
      );
  }

  ngOnInit(): void {
    this.getQuiz();
  }

}
