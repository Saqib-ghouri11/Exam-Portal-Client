import { QuestionService } from './../../../services/question/question.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private _fb:FormBuilder,
    private _questionService:QuestionService,
  ) { }

  quizTitle='';
  quizId=0;

  get getOption1(){
    return this.questionForm.get('option1')?.value
  }
  get getOption2(){
    return this.questionForm.get('option2')?.value
  }
  get getOption3(){
    return this.questionForm.get('option3')?.value
  }
  get getOption4(){
    return this.questionForm.get('option4')?.value
  }

  questionForm=this._fb.group({
    content:['',[Validators.required]],
    answer:['',[Validators.required]],
    option1:['',[Validators.required]],
    option2:['',[Validators.required]],
    option3:['',[Validators.required]],
    option4:['',[Validators.required]],
    quiz:this._fb.group({
      id:['',[Validators.required]]
    }),
  });

  postQuestion(){
    this._questionService.postQuestionOfQuiz(this.questionForm.value).subscribe(
      (response:any)=>{
        Swal.fire(
          "Success!",
          "Question added",
          "success"
        )
        console.log(response);
        this.questionForm.reset;
      },
      (error)=>{
        Swal.fire(
          "Error!",
          ""+error.error.message,
          "error"
        )
      }
    );
  }

  ngOnInit(): void {
    this.quizId=this._route.snapshot.params['id'];
    this.quizTitle=this._route.snapshot.params['title'];

    this.questionForm.patchValue({
      quiz:{
        id:this.quizId
      }
    })

  }

}
