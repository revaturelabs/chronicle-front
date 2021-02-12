import { AuthService } from './auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  /**
   * An http interceptor so that whenever we get a 401 response status we will be logged out. 
   * This means that we do not have a valid, token.  
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) =>{
        let errorMsg="";  
        if(error.status == 401){
          errorMsg = "Your session has expired."
          this.authService.logout(); 
        }
        return throwError(errorMsg); 
      })
    )
  }
}
