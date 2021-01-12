import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {

  //Form Fields
  description: string = "";
  createdBy: string | any = "";
  creationDate: Date = new Date(); //Successfully sets the day's date without user input (automation)
  subject: string = "";
  uploadFile: File | any;

  selectedFiles!: FileList;
  currentFile: File | any;
  progress = 0;
  message = '';

  fileInfos!: Observable<any>;

  constructor(private uploadService: UploadService, private authService: AuthService) { }

  ngOnInit(): void {
    //this.getFiles();
    this.createdBy = firebase.auth().currentUser?.uid; //Successfully pulled uid from firebase (automation)
  }
  async getFiles(){
    let token = await this.authService.getSyncToken();
    this.fileInfos = this.uploadService.getFiles(token);
  }
  /*
  This allows us to see our selected files and upload them to our back end.
  */
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  // //not used
  // onChange() {
  //   console.log(this.uploadFile);
  // }

  /*
  SelectedFiles is used to access the current file as our first item, and then call uploadService.upload()
  on our cuurentFile.
  We defined the upload progress in the the uploadservice, here we are calculating our progress by using
  event.loaded and dividing it by the total size.
  After the progress has finished the event will be an HttpResponse object which we can then assign
  its contents to the fileInfos variable after calling the getFiles() method.
  */
  async upload(){
    let token = await this.authService.getSyncToken();
    this.progress = 0;

    const dataObj = {
      description: this.description,
      date: this.creationDate,
      user: this.createdBy
      //tags will have to be integrated into this dataObj. I am not sure how to do so without first implementing the tags in the form.
      //fortunately, we don't really need tags for the http request to work.
    }

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(JSON.stringify(dataObj), this.currentFile, token).subscribe(
      event =>{
        if (event.type === HttpEventType.UploadProgress){
          if (event.total != undefined){
          this.progress = Math.round(100* event.loaded / event.total);
          }
        } else if (event instanceof HttpResponse) {
          if(event.body)
            this.message = event.body.message;
          //make get files in upload.service.ts
          this.fileInfos = this.uploadService.getFiles(token);
        }
      },
      err =>{
        this.progress = 0;
        this.message = 'Failed to upload your file.';
        //this.currentFile = undefined;
      });
      //this.selectedFiles = undefined;
  }

  //stores form data as JSON, replaced this with upload
  // onSubmit() {
  //   const dataObj = {
  //     title: this.title,
  //     user: this.createdBy,
  //     date: this.creationDate,
  //     subject: this.subject
  //   }
    
  //   this.uploadService.upload(dataObj);
  // }
}