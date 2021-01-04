import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  uploadFile!: File;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  onChange() {
    console.log(this.uploadFile);
  }

  onSubmit() {
    const dataObj = {
      title: this.title,
      user: this.createdBy,
      date: this.creationDate,
      subject: this.subject,
      file: this.uploadFile
    }
    
    this.uploadService.upload(dataObj);
  }
}