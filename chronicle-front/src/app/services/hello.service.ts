import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HelloService {

  constructor(private http: HttpClient) { }


  private helloUrl = 'http://localhost:8080/hello';

  //private var token = '';


  //This is how it is done to grab respone data from posts
  httpOptions: any = {
    headers: new HttpHeaders({
      //'Authorization': 
      'Content-Type': 'application/json'
    }),
    observe: 'response'
  };

 

  getHello(token: any): Observable<String> {

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)

    console.log(this.http.get<String>(this.helloUrl));
    return this.http.get<String>(this.helloUrl, {headers: headers});
  }
  



}
