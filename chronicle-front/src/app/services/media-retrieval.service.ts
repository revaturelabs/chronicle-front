import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Note } from '../models/Note';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class MediaRetrievalService {

  constructor() { }




  getNotes(): Observable<Note[]> {

  const n: Note = {
    id : 1,
    description : 'Note',
    userId : '',
    url : 'url',
    tags : []};
  const notes: Note[] = [n, n, n];
  return from([notes]);
  }


  getVideos(): Observable<Video[]> {
    const v: Video = {
      id : 1,
      description : 'Note',
      userId : '',
      url : 'url',
      tags : []};
    const videos: Video[] = [v, v, v];
    return from([videos]);
  }


}
