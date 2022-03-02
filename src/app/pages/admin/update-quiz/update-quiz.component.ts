
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interfaces/quiz';
import { Category } from 'src/app/interfaces/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private quizService: QuizService,
    private _router: ActivatedRoute,
    private _quizService: QuizService
  ) {
    this.data = {} as any;
    this.categories = [] as Array<Category>;
    this.data = localStorage.getItem('quizToUpdate');
  }



  data: any;

  quiz: Quiz = {} as Quiz;

  urlId = 0;

  categories: Array<Category>;
  quizUpdateForm=this.fb.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    maxMarks: ['', [Validators.required]],
    numberOfQuestions: ['', [Validators.required]],
    active: [''],
    category: this.fb.group({
      id: ['', [Validators.required]],
      title: [''],
      description: [''],
    }),
  });

  updateQuiz() {
    console.log(
      'here in update quiz ' + JSON.stringify(this.quizUpdateForm.value)
    );
    this.quizService.updateQuiz(this.quizUpdateForm.value).subscribe(
      (response: any) => {
        Swal.fire('Success!', '' + response.message, 'success');
      },
      (error: any) => {
        Swal.fire('Error!', '' + error.error.message, 'error');
      }
    );
  }



  ngOnInit(): void {
    this.urlId = this._router.snapshot.params['id'];

    this._quizService.getQuizById(this.urlId).subscribe(
      (response: any) => {
        this.quiz = response;
        let data={

        }
        this.quizUpdateForm.setValue({
          id:this.quiz.id,
          title: this.quiz.title,
        description: this.quiz.description,
        maxMarks: this.quiz.maxMarks,
        numberOfQuestions: this.quiz.numberOfQuestions,
       active: this.quiz.active,
        category:{
          id:this.quiz.category.id,
          title:this.quiz.category.title,
          description:this.quiz.description
        },

      });

        this.quizUpdateForm.asyncValidator;
      },
      (error) => {
        console.log(error);
      }
    );

    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = response;

      },
      (error) => {
        Swal.fire(
          'Error!',
          'loading categories ' + error.error.message,
          'error'
        );
      }
    );



  }
}
