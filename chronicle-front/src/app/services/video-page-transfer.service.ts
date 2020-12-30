import { Injectable } from '@angular/core';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class VideoPageTransferService {


  public video? : Video = undefined;

  constructor() { }
}
