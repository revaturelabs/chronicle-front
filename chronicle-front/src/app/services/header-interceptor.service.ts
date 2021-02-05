import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor{
  
  constructor(private authService: AuthService, private afAuth: AngularFireAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let requestHeaders; 
    // this.authService.getSyncToken()
    // .then(
    //   authToken =>{
    //     requestHeaders = new HttpHeaders({
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${authToken}`
    //     })
    //     return next.handle(req.clone({ headers: requestHeaders}));
    //   }
    // )
    // .catch( error =>{
    //   console.log(error); 
    // }
    // )

    this.afAuth.idToken.pipe(first()).subscribe(authToken => {
      requestHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      })
      console.log("hello"); 
      // return next.handle(req.clone({ headers: requestHeaders}));
    })
    
    throw new Error('Method not implemented.');
  }
}
