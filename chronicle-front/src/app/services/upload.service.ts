import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
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
  // upload(data:any) {
  //   console.log(data.title);
  //   this.http.post('${this.baseURL}/submit', data, {observe: 'response'})
  //   .subscribe((response) => {
  //     if (response.status ===200){
  //       console.log('upload successful')
  //     } else {
  //       console.log('upload unsuccessful')
  //     }
  //   }
  //   );
  // }
    

  /*
  This method uses FormData to append the name of the file into a key value pair.
  FormData is a structure that is used to store infformation in key-value pairs.
  The append() method writes a new value onto the existing key inside the FormData object or
  adds a key if it does not already exist.
  */
 upload(file: File): Observable<HttpEvent<any>>{
   const formData: FormData = new FormData();
   formData.append('file',file);

   /*
   The HttpClient allows us to send a POST request to the spring boot server.
   FormData also allows us to use a feature called reportProgress to show the status of uploading a file,
   however, using this is expensive since it changes detection for each event.
   */
   const req = new HttpRequest('POST', `${this.baseURL}/submit`, formData,{
     reportProgress: true,
     responseType: 'json'
   });
   return this.http.request(req);
 }
 //unsure if this should even be implemented 
 getFiles(): Observable<any>{
   return this.http.get(`${this.baseURL}/files`);
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