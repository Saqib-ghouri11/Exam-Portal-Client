import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/classes/constants';
import { Category } from 'src/app/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) {}

  getCategories(){
    return  this.httpClient.get(Constants.BASE_URL+Constants.GET_CATEGORIES,{responseType: 'json'}).pipe(
      catchError(this.handleError)
    );
  }

  addCategory(category:Category){
    return this.httpClient.post(Constants.BASE_URL+Constants.ADD_CATEGORY,category).pipe(
      catchError(this.handleError)
    );
  }

  //  error handler function
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
