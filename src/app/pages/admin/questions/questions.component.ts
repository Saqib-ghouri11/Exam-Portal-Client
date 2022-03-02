import { QuestionService } from './../../../services/question/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Questions } from 'src/app/interfaces/questions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(
    private _router:ActivatedRoute,
    private _questionService:QuestionService,
  ) {
    this.quezTitle='' as string;
    this.quezId=0 as number;
    this.questions={} as Array<Questions>
  }

  quezTitle:string;
  quezId:number;
  questions:Array<Questions>;

  getAllQuestionsByQuizId(id:number){

    this._questionService.getAllQuestionsByQuizId(id).subscribe(
      (response:any)=>{
        this.questions=response;
        console.log(this.questions);

      },
      (error)=>{
        console.log(error.error.message);

      }
    );

  }

  ngOnInit(): void {
    this.quezId=this._router.snapshot.params['id'];
    this.quezTitle=this._router.snapshot.params['title'];
    this.getAllQuestionsByQuizId(this.quezId);
  }

}
