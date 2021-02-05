import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor{
  
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let requestHeaders; 
    this.authService.getSyncToken()
    .then(
      authToken =>{
        requestHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        })
        return next.handle(req.clone({ headers: requestHeaders}));
      }
    )
    .catch( error =>{
      console.log(error); 
    }
    )
    throw new Error('Method not implemented.');
  }
}
