import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Constants } from 'src/app/classes/constants';
import { LoginCredentials } from 'src/app/interfaces/loginCredentials';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  generateToken(data:LoginCredentials){
    return this.httpClient.post(Constants.BASE_URL+Constants.USER_LOGIN,data).pipe(
       catchError(this.handleError)
     );
   }

   getCurrentUser(){
    return this.httpClient.get(Constants.BASE_URL+Constants.CURRENT_USER).pipe(
       catchError(this.handleError)
     );
   }
   loginUser(token:string)
   {
      localStorage.setItem('token',token);
      return true;
   }

   isUserLogin(){
     const token=this.getToken();
     if(token==null || token=='' || token==undefined){
       return false;
     }else{
       return true;
     }
   }

   getToken(){
      return localStorage.getItem('token');
   }

   logout(){
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     return true;
   }

   setUserDetails(user:any){
     localStorage.setItem('user',JSON.stringify(user));
   }

   getUserDetails(){
     const user=localStorage.getItem('user');
     if(user!=null){
      return JSON.parse(user);
     }else{
       this.logout();
       return null;
     }
   }
   getUserRole(){
     return this.getUserDetails().authorities;
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
