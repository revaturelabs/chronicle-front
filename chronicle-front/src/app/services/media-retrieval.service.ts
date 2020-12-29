import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Note } from '../models/Note';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class MediaRetrievalService {

  constructor() { }

  


  getNotes() : Observable<Note[]> {

  let n : Note = {
    id : 1,
    description : "Note",
    userId : "",
    url : "url",
    tags : []};
    let notes : Note[] = [n,n,n];
    return from([notes]);
  } 


  getVideos() : Observable<Video[]> {
    let v : Video = {
      id : 1,
      description : "Note",
      userId : "",
      url : "url",
      tags : []};
      let videos : Video[] = [v,v,v];
      return from([videos]);
  }


}
