import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UploadService {

  private baseURL = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  //HTTP Headers, unsure if this is needed in upload()
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  uploadFile(file:File) {
    const contentType = file.type;

    const params = {
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
  }
/*
this makes the call to the Spring boot Application
*/
  upload(data:any) {
    console.log(data.title);
    this.http.post('${this.baseURL}/submit', data, {observe: 'response'})
    .subscribe((response) => {
      if (response.status ===200){
        console.log('upload successful')
      } else {
        console.log('upload unsuccessful')
      }
    }
    );
  }
    

  // Error handling
  errorHandl(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}