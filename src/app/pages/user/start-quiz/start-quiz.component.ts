import { LocationStrategy } from '@angular/common';
import { Question } from 'src/app/interfaces/question';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from 'src/app/services/question/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

let questions;
@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private _quesService:QuestionService,
    private _snackBar:MatSnackBar,
    private _location:LocationStrategy,
  ) {
    history.pushState(null, "", window.location.href);
    this._location.onPopState(() => {
      history.pushState(null, "", window.location.href);
    });
  }
  quizId=0;

  questions:Array<Question>=[];




  ngOnInit(): void {



   this.quizId= this._route.snapshot.params['id'];
    this._quesService.getAllUserQuestionsByQuizId(this.quizId).subscribe(
      (response:any)=>{
        this.questions=response;

        // this step is necessary for setting an attribute in the existing object.
        this.questions.forEach(q=>{
          q['givenAnswer']='';
            // console.log(q);
        });


      },
      (error)=>{
          this._snackBar.open('Error '+error.error.message,'',{
            duration:3000
          });
      }
    );

  }

}
