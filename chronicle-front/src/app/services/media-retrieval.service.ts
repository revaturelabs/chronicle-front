import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { Note } from '../models/Note';
import { Tag } from '../models/Tag';
import { Video } from '../models/Video';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MediaRetrievalService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private requestHeaders = new HttpHeaders();

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

  // ====== Utility ============  

  async setHeaders() {
    const authToken = await this.authService.getSyncToken();
    this.requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })
  }


  public getAllTags() : Observable<Tag[]>{
    this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getTags, {headers: this.requestHeaders})
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

  public filterTags(allTags: Tag[], tagName: string): Tag[] {
    return allTags.filter(tag => tag.name == tagName);
  }

//============ Notes ===================
  getNotes() : Observable<Note[]> {

  
    let notes : Note[] = [this.n];
    return from([notes]);
  } 

  public getAllNotes() : Observable<Note[]> {
    return this.httpClient.get(environment.serverApiUrls.getAllNotes)
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
    return this.httpClient.get(environment.serverApiUrls.getNotesByTag + tagPath)
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

  public getNoteById(id: number) : Observable<Note> {
    return this.httpClient.get(environment.serverApiUrls.getNoteById + id)
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

//================= Videos ================
  getVideos() : Observable<Video[]> {
    
      let videos : Video[] = [this.v,this.b];
      return from([videos]);
  }

  public getAllVideos() : Observable<Video[]> {
    return this.httpClient.get(environment.serverApiUrls.getAllVideos)
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
    return this.httpClient.get(environment.serverApiUrls.getVideosByTag + tagPath)
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

  public getVideoById(id: number) : Observable<Video> {
    return this.httpClient.get(environment.serverApiUrls.getVideoById + id)
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
