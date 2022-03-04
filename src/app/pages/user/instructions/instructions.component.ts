import { QuestionService } from 'src/app/services/question/question.service';
import { Questions } from 'src/app/interfaces/questions';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interfaces/quiz';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private _quizService:QuizService,

  ) {
    this.quiz={} as Quiz


   }

  quiz:Quiz;
  quizId=0;




  ngOnInit(): void {
      this.quizId=this._route.snapshot.params['id'];

      this._quizService.getQuizById(this.quizId).subscribe(
        (response:any)=>{
          this.quiz=response;
        },
        (error)=>{
          Swal.fire(
            "Error!",
            ""+error.error.message,
            "error"
          );
        }

      );



  }

}
