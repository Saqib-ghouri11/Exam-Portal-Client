import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Constants } from '../classes/constants';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) {

   }
   register(data:any){
    return this.httpClient.post(Constants.BASE_URL+Constants.CREATE_USER,data).pipe(
       catchError(this.handleError)
     );
   }

   login(data:User){
    return this.httpClient.post(Constants.BASE_URL+Constants.USER_LOGIN,data).pipe(
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


