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
    description : 'Note',
    userId : '',
    url : 'url',
    tags : []};


  public getAllTags() : Observable<Tag[]>{
    return this.httpClient.get('http://localhost:8080/myapp/videos/available-tags')
    .pipe(map((resp:any) => {
      return resp.map((tag:any) => {
        let newTag: Tag = {
          tagid: tag.tagID,
          name: tag.name,
          value: tag.value
        };
        return newTag;
      })
    }));
  }

//====================================
  getNotes() : Observable<Note[]> {

  
    let notes : Note[] = [this.n];
    return from([notes]);
  } 

  public getAllNotes() : Observable<Note[]> {
    return this.httpClient.get('http://localhost:8080/myapp/notes/all')
    .pipe(map((resp:any) => {
      return resp.map((note:any) => {
        let newNote: Note = {
          id : note.noteID,
          description : note.description,
          userId : note.user,
          url : note.url,
          tags : note.noteTags
        };
        return newNote;
      })
    }));
  }

  public getNotesByTag(tags: Tag[]) : Observable<Note[]> {
    let tagPath: string = "";
    tags.forEach(tag => {
      tagPath += `${tag.name}:${tag.value}+`;
    });
    tagPath = tagPath.slice(0,-1);
    return this.httpClient.get(`http://localhost:8080/myapp/notes/${tagPath}`)
    .pipe(map((resp:any) => {
      return resp.map((note:any) => {
        let newNote: Note = {
          id : note.noteID,
          description : note.description,
          userId : note.user,
          url : note.url,
          tags : note.noteTags
        };
        return newNote;
      })
    }));
  }

  public getNoteByID(id: number) : Observable<Note> {
    return this.httpClient.get(`http://localhost:8080/myapp/notes/id/${id}`)
    .pipe(map((note:any) => {
      let newNote: Note = {
        id : note.noteID,
        description : note.description,
        userId : note.user,
        url : note.url,
        tags : note.noteTags
      };
      return newNote;
    }));
  }

//=========================================
  getVideos() : Observable<Video[]> {
    
      let videos : Video[] = [this.v,this.b];
      return from([videos]);
  }

  public getAllVideos() : Observable<Video[]> {
    return this.httpClient.get('http://localhost:8080/myapp/videos/all')
    .pipe(map((resp:any) => {
      return resp.map((video:any) => {
        let newVideo: Video = {
          id : video.videoID,
          description : video.description,
          userId : video.user,
          url : video.url,
          tags : video.videoTags
        };
        return newVideo;
      })
    }));
  }

  public getVideosByTag(tags: Tag[]) : Observable<Video[]> {
    let tagPath: string = "";
    tags.forEach(tag => {
      tagPath += `${tag.name}:${tag.value}+`;
    })
    tagPath = tagPath.slice(0,-1);
    return this.httpClient.get(`http://localhost:8080/myapp/videos/${tagPath}`)
    .pipe(map((resp:any) => {
      return resp.map((video:any) => {
        let newVideo: Video = {
          id : video.videoID,
          description : video.description,
          userId : video.user,
          url : video.url,
          tags : video.videoTags
        };
        return newVideo;
      })
    }));
  }

  public getVideoByID(id: number) : Observable<Video> {
    return this.httpClient.get(`http://localhost:8080/myapp/videos/id/${id}`)
    .pipe(map((video:any) => {
      let newVideo: Video = {
        id : video.videoID,
        description : video.description,
        userId : video.user,
        url : video.url,
        tags : video.videoTags
      };
      return newVideo;
    }));
  }

  



}
