import { Constants } from 'src/app/classes/constants';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _httpClient: HttpClient) {}

  getAllQuestionsByQuizId(id: number) {
    return this._httpClient.get(Constants.BASE_URL+Constants.GET_ALL_QUESTIONS_BY_ID+id).pipe(catchError(this.handleError));
  }
  //  error handler function
  private handleError(error: HttpErrorResponse) {
    let problem;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      problem = error;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      problem = error;
    }
    // Return an observable with a user-facing error message.
    return throwError(problem);
  }
}
