import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UploadService } from 'src/app/services/upload.service';

// Chip-related imports 
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Tag } from 'src/app/models/Tag';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';


@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {
  title: string = "";
  batch: string = "";
  description: string = "";

  // Variables that are autmoatically filled 
  createdBy: string | any = "";
  creationDate: Date = new Date();

  // Variables related to file upload
  uploadFile: File | any;
  selectedFiles!: FileList;
  currentFile: File | any;
  progress = 0;
  message = '';
  fileInfos!: Observable<any>;

  // Variables related to topics 
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tag[] = [];
  existingTopics: Tag[] = [];
  existingBatch: Tag[] = [];


  constructor(private uploadService: UploadService, private authService: AuthService, private mediaRetrievalService: MediaRetrievalService) { }

  ngOnInit(): void {
    this.createdBy = firebase.auth().currentUser?.displayName; //Successfully pulled uid from firebase (automation)
    this.mediaRetrievalService.getAllTags().subscribe(resp => {
      this.existingTopics = this.mediaRetrievalService.filterTags(resp,"Topic");
      this.existingBatch = this.mediaRetrievalService.filterTags(resp,"Batch");
    })
  }

  async getFiles() {
    let token = await this.authService.getSyncToken();
    this.fileInfos = this.uploadService.getFiles(token);
  }

  // This allows us to see our selected files and upload them to our back end.
  selectFile(event: any) {
    console.log("EVENT: ");
    console.log(event);
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  /*
    SelectedFiles is used to access the current file as our first item, and then call uploadService.upload()
    on our cuurentFile.
    We defined the upload progress in the the uploadservice, here we are calculating our progress by using
    event.loaded and dividing it by the total size.
    After the progress has finished the event will be an HttpResponse object which we can then assign
    its contents to the fileInfos variable after calling the getFiles() method.
  */
  async upload() {
    let token = await this.authService.getSyncToken();
    this.progress = 0;
    if (this.batch) {
      let batchExists = true;
      this.existingBatch.forEach(tag => {
        if(tag.value.toLowerCase() == this.batch.toLowerCase()) {
          console.log("pushed " + tag)
          this.tags.push(tag);
          batchExists = false;
        }
      })
      if (batchExists) {
        this.tags.push({
          tagID: "0",
          name: "Batch",
          value: this.batch
        })
      }
    }
    const dataObj = {
      // These properties are not tags 
      title: this.title,
      user: this.createdBy,
      date: this.creationDate,
      description: this.description,

      // These properties are tags 
      tags: this.tags,
    }

    console.log(dataObj.title);
    console.log(dataObj.user);
    console.log(dataObj.date);
    console.log(dataObj.description); 


    // console.log(dataObj.batch);
    console.log(dataObj.tags);

    this.currentFile = this.selectedFiles.item(0);
    console.log("FILE: ")
    console.log(this.currentFile);

    this.uploadService.upload(JSON.stringify(dataObj), this.currentFile, token).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total != undefined) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
        } else if (event instanceof HttpResponse) {
          if (event.body)
            this.message = event.body.message;
          //make get files in upload.service.ts
          this.fileInfos = this.uploadService.getFiles(token);
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Failed to upload your file.';
        //this.currentFile = undefined;
      });
    //this.selectedFiles = undefined;
  }


  // Methods for adding and removing topic tags 
  // Add a topic
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // TAGID'S VALUE NEEDS TO BE CHANGED
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
            name: "Topic",
            value: value.trim().charAt(0).toUpperCase() + value.trim().slice(1)
          });
        }
      } else {
        this.tags.push({
          tagID: "0",
          name: "Topic",
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
}
