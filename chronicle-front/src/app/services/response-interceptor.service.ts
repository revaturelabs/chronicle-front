import { AuthService } from './auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * An http interceptor so that whenever we get a 401 response status we will be logged out.
 * A status code of 401 means we do not have a valid token.
 * Implementing HttpInterceptor but also utilizing HttpErrorResponse.
 */
@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

   /**
    * intercept method takes in the HttpRequest and HttpHandler and returns an Observable.
    * Utilizing the HttpErrorResponse module, to catch any 401 status codes.
    * If we do receive a 401, we leave a message and call the AuthService logout().
    * @param req, the outgoing request object to handle.
    * @param next, the next interceptor in the chain, or the backend if no interceptors remain in the chain.
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
