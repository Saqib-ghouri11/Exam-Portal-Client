import { QuestionService } from './../../../services/question/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Questions } from 'src/app/interfaces/questions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(
    private _router: ActivatedRoute,
    private _questionService: QuestionService
  ) {
    this.quezTitle = '' as string;
    this.quezId = 0 as number;
    this.questions = {} as Array<Questions>;
  }

  quezTitle: string;
  quezId: number;
  questions: Array<Questions>;

  // delete question
  deleteQuestion(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._questionService.deleteQuestion(id).subscribe(
          (response: any) => {
            this.questions=this.questions.filter((question)=>question.id!=id);
            Swal.fire('Deleted!', 'Your Question has been deleted.', 'success');
          },
          (error) => {
            Swal.fire('Error!', '' + error.error.message, 'error');
          }
        );
      }
    });
  }

  getAllQuestionsByQuizId(id: number) {
    this._questionService.getAllQuestionsByQuizId(id).subscribe(
      (response: any) => {
        this.questions = response;
        console.log(this.questions);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  ngOnInit(): void {
    this.quezId = this._router.snapshot.params['id'];
    this.quezTitle = this._router.snapshot.params['title'];
    this.getAllQuestionsByQuizId(this.quezId);
  }
}
