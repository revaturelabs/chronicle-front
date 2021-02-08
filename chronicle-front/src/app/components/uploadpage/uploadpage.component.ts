import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { Tag } from 'src/app/models/Tag';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';

@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {

  //Form input variables
  title: string = "";
  batch: string = "";
  description: string = "";
  private: boolean = false;
  userWhitelist: string[] = [];

  // Variables that are autmoatically filled
  createdBy: string | any = "";
  creationDate: Date = new Date();

  // Variables related to file upload
  @ViewChild('file') file!: ElementRef;
  selectedFiles!: FileList;
  currentFile: File | any;
  progress: Number = 0;
  message = '';
  fileInfos!: Observable<any>;

  // Variables related to topics
  @ViewChild('input') input!: ElementRef;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tag[] = [];
  existingTopics: Tag[] = [];
  existingBatch: Tag[] = [];


  constructor(private authService: AuthService, private snackBar: MatSnackBar, private uploadService: UploadService, private mediaRetrievalService: MediaRetrievalService) { }

  ngOnInit(): void {
    this.createdBy = firebase.auth().currentUser?.displayName; //Successfully pulled uid from firebase (automation)
    console.log(this.createdBy);
    this.mediaRetrievalService.getAllTags().subscribe(resp => {
      this.existingTopics = this.mediaRetrievalService.filterTags(resp,"Topic");
      this.existingBatch = this.mediaRetrievalService.filterTags(resp,"Batch");
    })
  }

  // This allows us to see our selected files and upload them to our back end.
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    console.log("File to upload: " + this.selectedFiles.item(0)?.name);
  }

  /*
    SelectedFiles is used to access the current file as our first item, and then call uploadService.upload()
    on our cuurentFile.
    We defined the upload progress in the the uploadservice, here we are calculating our progress by using
    event.loaded and dividing it by the total size.
    After the progress has finished the event will be an HttpResponse object which we can then assign
    its contents to the fileInfos variable after calling the getFiles() method.
  */
  upload() {
    //this still uses the .getSyncToken()
    this.progress = 0;

    if (this.batch) {
      let batchExists = true;
      this.existingBatch.forEach(tag => {
        if(tag.value.toLowerCase() == this.batch.toLowerCase()) {
          this.tags.push(tag);
          console.log("Pushed " + tag);
          batchExists = false;
        }
      })
      if (batchExists) {
        this.tags.push({
          tagID: "0",
          type: "Batch",
          value: this.batch
        })
      }
    }

    // If private, set whitelist
    let whitelist = [];
    if (this.private) {
      whitelist = this.userWhitelist;
    }

    //The JSON object we are going to send to the back-end using the Upload Service
    const dataObj = {
      title:        this.title,
      user:         this.createdBy,
      date:         this.creationDate,
      description:  this.description,
      tags:         this.tags
    }
    console.log(dataObj);

    this.currentFile = this.selectedFiles.item(0);
    console.log("File: " + this.currentFile);

    //Call the Upload Service to send our data to the back-end
    this.uploadService.upload(JSON.stringify(dataObj), this.currentFile)
    .subscribe(resp => {
        /* Future feature: Recieve UploadProgress
        status that can be displayed on a Progress Bar */

        //Recieve HTTP status response and display as a Snack Bar
        console.log(resp.body);
        this.snackBar.open(resp.body, 'Close', {duration: 2000});
      },
      err => {
        console.log(err);
        this.snackBar.open('An error has occured with your request!', 'Close', {duration: 2000});
      });


    this.resetFields();
  }

  resetFields(): void {
    this.title = "";
    this.description = "";
    this.batch = "";
    this.tags = [];
    this.input.nativeElement.value = "";
    this.file.nativeElement.value = "";
    this.private = false;
  }

  // Methods for adding and removing topic tags
  // Add a topic
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // "name" set to "topic" by default
    if ((value || '').trim()) {
      this.existingTopics.forEach(tag => {
        if (value.toLowerCase() == tag.value.toLowerCase()) {
          this.tags.push(tag);
        }
      })
      if (this.tags.length > 0) {
        let exists = true;
        this.tags.forEach(tag => {
          if (value.toLowerCase() == tag.value.toLowerCase()) {
            exists = false;
          }
        })
        if (exists) {
          this.tags.push({
            tagID: "0",
            type: "Topic",
            value: value.trim().charAt(0).toUpperCase() + value.trim().slice(1)
          });
        }
      } else {
        this.tags.push({
          tagID: "0",
          type: "Topic",
          value: value.trim().charAt(0).toUpperCase() + value.trim().slice(1)
        });
      }
    }

    if (input) {
      input.value = '';
    }
  }

  // Remove a topic
  remove(topic: Tag): void {
    const index = this.tags.indexOf(topic);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  setUserList(idList: string[]) {
    this.userWhitelist = idList;
  }
}
