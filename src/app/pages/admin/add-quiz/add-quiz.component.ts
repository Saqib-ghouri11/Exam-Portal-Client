import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
 
  constructor(private categoryService:CategoryService,private fb:FormBuilder,private quizService:QuizService,private router:Router) { 
    this.category={} as Category
  }

  quizForm=this.fb.group({
    title:['',[Validators.required]],
    description:['',[Validators.required]],
    maxMarks:['',[Validators.required]],
    numberOfQuestions:['',[Validators.required]],
    active:[''],
    category:['',[Validators.required]],
  });

  get getSelectCategory(){
    return this.quizForm.get('category');
  }

  categories:Array<Category>=[];
  category:Category

  addQuiz(){
    this.category={id:this.getSelectCategory?.value,title:'',description:''}
    this.quizForm.get('category')?.setValue(this.category);
    this.quizService.addQuiz(this.quizForm.value).subscribe(
      (response:any)=>{
        console.log(response);
        
        Swal.fire(
          'Success!',
          'Quiz '+response.title+' added successfully',
          'success'
        );
          this.router.navigate(['/admin-dashboard/quizzes']);
      },
      (error:any)=>{
        Swal.fire(
          'Error!',
          error.error.message,
          'error'
        );
      }
      );
    console.log('here in add quiz',this.quizForm.value);
    
    
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (response:any)=>{
        this.categories=response;
        console.log(this.categories);
        
      },
    (error)=>{
      console.log(error);
      Swal.fire(
        'Error!',
        'Error Loading data from server',
        'error'
      );
    }
    );
  }

}
