import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * An HttpInterceptor that will intercept all requests being made and attach the firebase token to the header.
 * Implementing from HttpInterceptor.
 */
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private afauth: AngularFireAuth, private authService: AuthService){}

  /**
   * intercept method takes in the HttpRequest and an HttpHandler, and returns an Observable.
   * Utilizing the AuthService to grab the current users token.
   * @param req, the outgoing request object to handle.
   * @param next, the next interceptor in the chain, or the backend if no interceptors remain in the chain.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let authToken = this.authService.Jwt;
      let reqHeaders = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })
      return next.handle(req.clone({headers: reqHeaders}))
  }
}
