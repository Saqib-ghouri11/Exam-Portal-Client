import { QuestionService } from 'src/app/services/question/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  ) { }
  quizId=0;




  ngOnInit(): void {
   this.quizId= this._route.snapshot.params['id'];
    this._quesService.getAllUserQuestionsByQuizId(this.quizId).subscribe(
      (response:any)=>{
        questions=response;

        // this step is necessary for setting an attribute in the existing object.
        questions.forEach((q: { [x: string]: string; })=>{
          q['givenAnswer']='';
          console.log(q);
        });


      },
      (error)=>{

      }
    );

  }

}
