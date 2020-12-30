import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Note } from '../models/Note';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class MediaRetrievalService {

  constructor() { }

  v : Video = {
    id : 1,
    description : "Routing with Angular",
    userId : "1",
    url : "https://www.w3schools.com/html/mov_bbb.mp4",
    tags : [{tagid: "1",name : "topic", value : "Angular"}]
  };
  b : Video = {
    id : 2,
    description : "Introduction to OOP",
    userId : "1",
    url : "https://www.w3schools.com/html/mov_bbb.mp4",
    tags : [{tagid: "2",name : "topic", value : "Java"}]
  };

  n : Note = {
    id : 1,
    description : "Note",
    userId : "",
    url : "url",
    tags : []};


  getNotes() : Observable<Note[]> {

  
    let notes : Note[] = [this.n];
    return from([notes]);
  } 


  getVideos() : Observable<Video[]> {
    
      let videos : Video[] = [this.v,this.b];
      return from([videos]);
  }

  getVideoById(id : number) : Observable<Video> {
    return from([this.v]);
  }





}
