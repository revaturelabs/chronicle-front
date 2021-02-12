import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})




/**
 * Basic Example of a service
 *
 * */
export class HelloService {

  constructor(private http: HttpClient) { }


  private helloUrl = environment.apiBase + '/test/hello';


  // httpOptions: any = {
  //   headers: new HttpHeaders({
  //     // 'Authorization':
  //     'Content-Type': 'application/json'
  //   }),
  //   observe: 'response'
  // };

   getHello(): Observable<any> {

    // console.log(token);

    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Bearer ' + token);

    // console.log(headers);


    // console.log(this.http.get<any>(this.helloUrl, {headers}));
    return this.http.get<any>(this.helloUrl);
  }

}
