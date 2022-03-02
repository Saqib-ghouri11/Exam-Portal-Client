import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  constructor(private quizService:QuizService,private router:Router) {
    this.cat={} as Quiz;
  }

  cat:Quiz;

  goToUpdateComp(item:Quiz){
   localStorage.setItem('quizToUpdate',JSON.stringify(item));
    this.router.navigateByUrl('/admin-dashboard/update-quiz/'+item.id);
  }

  quizzes:Array<Quiz>=[];


  deleteQuiz(id:number){
    this.quizService.deleteQuiz(id).subscribe(

      (response:any)=>{


        this.quizzes=this.quizzes.filter((quiz)=>quiz.id != id);
          Swal.fire(
            "Success!",
            ""+response.message,
            "success"
          );
      },
      (error)=>{
        Swal.fire(
          "Error!",
          ""+error.error.message,
          "error"
        );
      }

      );
  }

  getQuiz(){
    this.quizService.getQuizes().subscribe(
      (response:any)=>{
        this.quizzes=response;
        console.log(this.quizzes);

      },
      (error)=>{
        console.log(error.error.value);

      }
      );
  }

  ngOnInit(): void {
    this.getQuiz();
  }

}
