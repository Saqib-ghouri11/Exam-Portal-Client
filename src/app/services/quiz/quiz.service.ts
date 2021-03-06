import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/classes/constants';
import { Quiz } from 'src/app/interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  getByCategoryActiveQuizzes(catId: number) {
    return this.httpClient.get(Constants.BASE_URL+Constants.GET_BY_CATEGORY_ACTIVE_QUIZZES+catId).pipe(
      catchError(this.handleError)
    );
  }

  getQuizById(id:number) {
    return this.httpClient.get(Constants.BASE_URL+Constants.GET_QUIZ_BY_ID+id).pipe(
      catchError(this.handleError)
    );
  }
  updateQuiz(value: Quiz) {
    console.log(Constants.BASE_URL+Constants.PUT_QUIZ);

    return this.httpClient.put(Constants.BASE_URL+Constants.PUT_QUIZ,value).pipe(
      catchError(this.handleError)
    );
  }

  constructor(private httpClient:HttpClient) { }

  getQuizes(){
    return this.httpClient.get(Constants.BASE_URL+Constants.GET_QUIZZES).pipe(
      catchError(this.handleError)
    );
  }
  getActiveQuizzes(){
    return this.httpClient.get(Constants.BASE_URL+Constants.GET_ACTIVE_QUIZZES).pipe(
      catchError(this.handleError)
    );
  }

  addQuiz(quiz:Quiz){
   return this.httpClient.post(Constants.BASE_URL+Constants.POST_QUIZ,quiz).pipe(
      catchError(this.handleError)
    );
  }

  deleteQuiz(id:number){
      return this.httpClient.delete(Constants.BASE_URL+Constants.DELETE_QUIZ_BY_ID+id).pipe(
        catchError(this.handleError)
      );
  }

  //  error handler function
  private handleError(error: HttpErrorResponse) {
    let problem;
   if (error.status === 0) {
     // A client-side or network error occurred. Handle it accordingly.
     console.error('An error occurred:', error.error);
     problem=error
   } else {
     // The backend returned an unsuccessful response code.
     // The response body may contain clues as to what went wrong.
     console.error(
       `Backend returned code ${error.status}, body was: `, error.error);
       problem= error;
   }
   // Return an observable with a user-facing error message.
   return throwError(
     problem);
 }
}
