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
      description : "Take On Me",
      userId : "a-ha",
      url : "https://www.youtube.com/watch?v=djV11Xbc914",
      tags : [{tagid: "1",name : "Dank", value : "val"}]
    };
    let b : Video = {
      id : 1,
      description : "Big Buck Bunny",
      userId : "a-ha",
      url : "https://www.youtube.com/watch?v=djV11Xbc914",
      tags : [{tagid: "1",name : "Dank", value : "val"}]
    };
      
      
      
      
      let videos : Video[] = [v,b];
      return from([videos]);
  }





}
