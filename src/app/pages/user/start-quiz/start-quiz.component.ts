import { LocationStrategy } from '@angular/common';
import { Question } from 'src/app/interfaces/question';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from 'src/app/services/question/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';


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

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';

  quizId=0;

  questions:Array<Question>=[];

  correctAnswers=0;
  attempts=0;
  obtMarks=0;
  singleQuesMarks=0;
  isSubmit=false;


onSubmitQuiz(){

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Submit it!'
  }).then((result) => {
    if (result.isConfirmed) {

      this.QuizEval();


    }
  });

}



QuizEval(){
  this.questions.forEach(q=>{
    if(q.answer==q.givenAnswer)
    {
      this.correctAnswers++;
    }
    if(q.givenAnswer!=''){
      this.attempts++;
    }
});




this.singleQuesMarks=this.questions[0].quiz.maxMarks/this.questions.length;
this.obtMarks=this.singleQuesMarks*this.correctAnswers;
this.isSubmit=true;

console.log('correct answer '+this.correctAnswers +'attempts '+this.attempts+'obtained marks '+this.obtMarks);
}
timer=0;
total=0;
 tp=0;



updateTimer(){
  let t=window.setInterval(()=>{
    if(this.timer<=0){
      this.QuizEval();
      clearInterval(t);
    }else{
      this.timer--;
    }
  },1000);
}
getFormatedTimer(){
  let mm=Math.floor(this.timer/60);
  let ss=this.timer-mm*60;
  return `${mm} min : ${ss} sec`;
}
  ngOnInit(): void {





   this.quizId= this._route.snapshot.params['id'];
    this._quesService.getAllUserQuestionsByQuizId(this.quizId).subscribe(
      (response:any)=>{
        this.questions=response;
        this.timer=this.questions.length*60;
        this.total=this.questions.length*60;

        console.log(this.timer+" "+this.total);

        // this step is necessary for setting an attribute in the existing object.
        this.questions.forEach(q=>{
          q['givenAnswer']='';
            // console.log(q);
        });

        this.updateTimer();
      },
      (error)=>{
          this._snackBar.open('Error '+error.error.message,'',{
            duration:3000
          });
      }
    );

  }

}
