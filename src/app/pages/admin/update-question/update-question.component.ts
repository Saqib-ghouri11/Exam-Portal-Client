
import { MatSnackBar } from '@angular/material/snack-bar';
import { Questions } from 'src/app/interfaces/questions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _questionService: QuestionService,
    private _snackBar: MatSnackBar
  ) {
    this.question = {} as Questions;
  }

  quizTitle = '';
  quesId = 0;
  quizId = 0;
  question: Questions;

  get getOption1() {
    return this.questionUpdateForm.get('option1')?.value;
  }
  get getOption2() {
    return this.questionUpdateForm.get('option2')?.value;
  }
  get getOption3() {
    return this.questionUpdateForm.get('option3')?.value;
  }
  get getOption4() {
    return this.questionUpdateForm.get('option4')?.value;
  }

  questionUpdateForm = this._fb.group({
    id:['',Validators.required],
    content: ['', [Validators.required]],
    answer: ['', [Validators.required]],
    option1: ['', [Validators.required]],
    option2: ['', [Validators.required]],
    option3: ['', [Validators.required]],
    option4: ['', [Validators.required]],
    quiz: this._fb.group({
      id: ['', [Validators.required]],
    }),
  });

  putQuestion() {
    this._questionService
      .putQuestionOfQuiz(this.questionUpdateForm.value)
      .subscribe(
        (response: any) => {
          Swal.fire('Success!', 'Question Updated', 'success');
          console.log(response);
          this.questionUpdateForm.reset;
        },
        (error) => {
          Swal.fire('Error!', '' + error.error.message, 'error');
        }
      );
  }

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params['id'];
    console.log('ques id: '+this.quesId);

    this._questionService.getQuestionById(this.quesId).subscribe(
      (response: any) => {
        this.question = response;
        this.quizTitle = this.question.quiz.title;
        this.quizId = this.question.quiz.id;
        this.questionUpdateForm.patchValue({
          id:this.question.id,
          content:this.question.content,
          answer:this.question.answer,
          option1:this.question.option1,
          option2:this.question.option2,
          option3:this.question.option3,
          option4:this.question.option4,


          quiz: {
            id: this.quizId,

          },
        });
      },
      (error) => {
        this._snackBar.open(
          'error loading question:' + error.error.message,
          '',
          { duration: 3000 }
        );
      }
    );
  }
}
