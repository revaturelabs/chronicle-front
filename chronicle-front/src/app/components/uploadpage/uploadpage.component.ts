import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {

  //Form Fields
  title: string = "";
  createdBy: string = "";
  creationDate: Date = new Date();
  subject: string = "";
<<<<<<< HEAD
  uploadFile: File | any;

  selectedFiles!: FileList;
  currentFile: File | any;
=======
  uploadFile!: File;

  selectedFiles!: FileList;
  currentFile!: File;
>>>>>>> 3e31cc9226ead8a57c649cc5b8cb4a69e224936d
  progress = 0;
  message = '';

  fileInfos!: Observable<any>;

  constructor(private uploadService: UploadService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getFiles();
  }
  async getFiles(){
    let token = await this.authService.getSyncToken();
    this.fileInfos = this.uploadService.getFiles(token)
  }
  /*
  This allows us to see our selected files and upload them to our back end.
  */
<<<<<<< HEAD
  selectFile(event:any) {
=======
  selectFile(event: Event) {
>>>>>>> 3e31cc9226ead8a57c649cc5b8cb4a69e224936d
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
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile, token).subscribe(
      event =>{
        if (event.type === HttpEventType.UploadProgress){
          if (event.total != undefined){
          this.progress = Math.round(100* event.loaded / event.total);
          }
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          //make get files in upload.service.ts
          this.fileInfos = this.uploadService.getFiles(token);
        }
      },
      err =>{
        this.progress = 0;
        this.message = 'Failed to upload your file.';
<<<<<<< HEAD
        this.currentFile = this.currentFile;
      });
      // this.selectedFiles = undefined;
=======
        //this.currentFile = undefined;
      });
      //this.selectedFiles = undefined;
>>>>>>> 3e31cc9226ead8a57c649cc5b8cb4a69e224936d
  }

  //stores form data as JSON, replaced this with upload
  // onSubmit() {
  //   const dataObj = {
  //     title: this.title,
  //     user: this.createdBy,
  //     date: this.creationDate,
  //     subject: this.subject,
  //     file: this.uploadFile
  //   }
    
  //   this.uploadService.upload(dataObj);
  // }
}