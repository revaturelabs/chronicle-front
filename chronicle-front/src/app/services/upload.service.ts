import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file:File) {
    const contentType = file.type;

    const params = {
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
  }
}
