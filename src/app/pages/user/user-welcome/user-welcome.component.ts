import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { Quiz } from 'src/app/interfaces/quiz';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css'],
})
export class UserWelcomeComponent implements OnInit {
  constructor(
    private _quizService: QuizService,
    private _route: ActivatedRoute
  ) {
    this.quizzes = [] as Array<Quiz>;
  }

  quizzes: Array<Quiz>;

  quizCheck=false;

  catId = 0;

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      if (params['id'] != 0) {
        this.catId = params['id'];
        this._quizService.getByCategoryActiveQuizzes(this.catId).subscribe(
          (response: any) => {
            this.quizzes = response;
            console.log(this.quizzes.length);

            if(this.quizzes.length!=0){
              this.quizCheck=false;
            }else{
              this.quizCheck=true;
            }
            console.log(this.quizCheck);

          },
          (error) => {
            Swal.fire('Error!', '' + error.error.message, 'error');
          }
        );
      } else {
        this._quizService.getActiveQuizzes().subscribe(
          (response: any) => {
            this.quizzes = response;
            if(this.quizzes.length!=0){
              this.quizCheck=false;
            }else{
              this.quizCheck=true;
            }
          },
          (error) => {
            Swal.fire('Error!', '' + error.error.message, 'error');
          }
        );
      }
    });
  }
}
