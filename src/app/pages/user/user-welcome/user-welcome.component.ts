import { QuizService } from 'src/app/services/quiz/quiz.service';
import { Quiz } from 'src/app/interfaces/quiz';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent implements OnInit {

  constructor(
    private _quizService:QuizService,
  ) {
    this.quizzes=[] as Array<Quiz>
  }

  quizzes:Array<Quiz>;

  ngOnInit(): void {

    this._quizService.getQuizes().subscribe(
      (response:any)=>{

      },
      (error)=>{
        Swal.fire(
          'Error!',
          ''+error.error.message,
          'error'
        );
      }
    );

  }

}
