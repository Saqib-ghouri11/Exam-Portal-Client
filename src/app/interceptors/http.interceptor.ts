import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { LoginService } from "../services/login/login.service";

@Injectable()
export class RequestInterceptorService implements HttpInterceptor{

    constructor(private loginService:LoginService){}
 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token=this.loginService.getToken();
       console.log('inside interceptor');
      
       if(this.loginService.getToken()!=null){
           req=req.clone({
               
               setHeaders:{
                Authorization:`Bearer ${token}`,  
                },
           });
       }
        return next.handle(req).pipe(
            catchError((err) => {
              if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                  // redirect user to the logout page
               }
            }
            return throwError(err);
          })
         );

    }
    
}
export const authInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptorService,
        multi: true,
    },
];