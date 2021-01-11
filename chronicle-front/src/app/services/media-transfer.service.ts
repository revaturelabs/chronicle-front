import { Injectable } from '@angular/core';
import { Note } from '../models/Note';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class MediaTransferService {


  public video? : Video = undefined;
  public note?: Note 

  constructor() { }
}
