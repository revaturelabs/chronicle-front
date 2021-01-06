import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class HelloService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  private helloUrl = 'http://localhost:8080/test/hello';


  httpOptions: any = {
    headers: new HttpHeaders({
      // 'Authorization':
      'Content-Type': 'application/json'
    }),
    observe: 'response'
  };

   getHello(token: any): Observable<any> {

    console.log(token);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    console.log(headers);


    console.log(this.http.get<any>(this.helloUrl, {headers}));
    return this.http.get<any>(this.helloUrl, {headers});
  }

}
