import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { Note } from '../models/Note';
import { Tag } from '../models/Tag';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class MediaRetrievalService {

  constructor(private httpClient: HttpClient) { }

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

  public getAllNotes() : Observable<any> {
    return this.httpClient.get('http://localhost:8080/myapp/notes/all')
  }

  public getNotesByTag(tags: Tag[]) : Observable<any> {
    let tagPath: string = "";
    tags.forEach(tag => {
      tagPath += `${tag.name}:${tag.value}+`;
    })
    tagPath = tagPath.slice(0,-1);
    return this.httpClient.get(`http://localhost:8080/myapp/videos/${tagPath}`)
  }


  getVideos() : Observable<Video[]> {
    
      let videos : Video[] = [this.v,this.b];
      return from([videos]);
  }

  public getAllVideos() : Observable<any> {
    return this.httpClient.get('http://localhost:8080/myapp/videos/all')
  }

  public getVideosByTag(tags: Tag[]) : Observable<any> {
    let tagPath: string = "";
    tags.forEach(tag => {
      tagPath += `${tag.name}:${tag.value}+`;
    })
    tagPath = tagPath.slice(0,-1);
    return this.httpClient.get(`http://localhost:8080/myapp/notes/${tagPath}`)
  }

  getVideoById(id : number) : Observable<Video> {
    return from([this.v]);
  }





}
