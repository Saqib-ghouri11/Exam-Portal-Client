import { QuizService } from 'src/app/services/quiz/quiz.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
    private quizService:QuizService,
  ) {
    this.data = {} as any;
    this.categories = [] as Array<Category>;
    this.data = localStorage.getItem('quizToUpdate');
    this.quiz = {} as Quiz;
    this.quizUpdateForm = {} as FormGroup;
  }

  data: any;

  quiz: Quiz;

  categories: Array<Category>;
  quizUpdateForm: FormGroup;

  updateQuiz() {
    console.log(
      'here in update quiz ' + JSON.stringify(this.quizUpdateForm.value)
    );
    this.quizService.updateQuiz(this.quizUpdateForm.value).subscribe(
      (response:any)=>{
        Swal.fire(
          "Success!",
          ""+response.message,
          "success"
        );
      },
      (error:any)=>{
        Swal.fire(
          "Error!",
          ""+error.error.message,
          "error"
        );
      }

      );
  }

  ngOnInit(): void {
    this.quiz = JSON.parse(this.data);

    this.quizUpdateForm = this.fb.group({
      id:[this.quiz.id,[Validators.required]],
      title: [this.quiz.title, [Validators.required]],
      description: [this.quiz.description, [Validators.required]],
      maxMarks: [this.quiz.maxMarks, [Validators.required]],
      numberOfQuestions: [this.quiz.numberOfQuestions, [Validators.required]],
      active: [this.quiz.active],
      category: this.fb.group({
        id:['',[Validators.required]],
        title:[''],
        description:['']
      }),
    });

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
