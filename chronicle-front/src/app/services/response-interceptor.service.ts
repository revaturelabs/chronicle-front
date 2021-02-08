import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log("hello in response interceptor");

  return next.handle(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // this.toastr.success("Object created.");
        console.log("gettingg hit")
        

      }
    })
  );
  }
}
