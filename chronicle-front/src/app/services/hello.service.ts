import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import firebase from 'firebase/app'


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

   getHello(token: any): Observable<any> {

    console.log(token);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    console.log(headers);


    console.log(this.http.get<any>(this.helloUrl, {headers: headers}));
    return this.http.get<any>(this.helloUrl, {headers: headers});
  } 

  /*getHello():Observable<any>{
    firebase.auth().currentUser?.getIdToken().then(token=>{
      let headers = new HttpHeaders().set('Authorization', 'Bearer '+token);
      return this.http.get<any>(this.helloUrl, {headers: headers});
    })
  }
  */
}