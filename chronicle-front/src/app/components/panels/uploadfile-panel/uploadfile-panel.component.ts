import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-uploadfile-panel',
  templateUrl: './uploadfile-panel.component.html',
  styleUrls: ['./uploadfile-panel.component.css']
})
export class UploadfilePanelComponent implements OnInit {

  private fileToUpload!: File;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    
  }

  handleFileInput(file: File) {
    this.fileToUpload = file;
  }

  submit() {
    if(this.fileToUpload) {
      this.uploadService.uploadFile(this.fileToUpload);
    }
  }

}
