import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concatMap, map, switchMap, take } from 'rxjs/operators';
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

  selectedTags: Tag[] = [];
  selectedBatchTags: Tag[] =[];
  allTags: Tag[] =[];

  // ====== Utility ============  

  // Sets authentication headers
  async setHeaders() {
    const authToken = await this.authService.getSyncToken();
    this.requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })
  }

  // Retrieves all tags from the db and maps them to a Tag model
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

  // Utility function to filter tags by their 'name'
  public filterTags(allTags: Tag[], tagName: string): Tag[] {
    return allTags.filter(tag => tag.name == tagName);
  }

//============ Notes ===================

//Retrieves all notes from the DB and maps them to a Note model
  public getAllNotes() : Observable<Note[]> {
    this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getAllNotes, {headers: this.requestHeaders})
    .pipe(map((resp:any) => {
      return resp.take(5).map((note:any) => {
        let newNote: Note = {
          id : note.id,
          description : note.description,
          userId : note.user,
          url : note.url,
          tags : note.tags
        };
        return newNote;
      })
    }));
  }
 //Retrieves Notes by tag(s) from DB and maps them to a Note model
  public getNotesByTag(tags: Tag[]) : Observable<Note[]> {
    let tagPath: string = "";
    tags.forEach(tag => {
      tagPath += `${tag.tagid}:${tag.name}:${tag.value}+`;
    });
    tagPath = tagPath.slice(0,-1);
    this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getNotesByTag + tagPath, {headers: this.requestHeaders})
    .pipe(map((resp:any) => {
      return resp.map((note:any) => {
        let newNote: Note = {
          id : note.id,
          description : note.description,
          userId : note.user,
          url : note.url,
          tags : note.tags
        };
        return newNote;
      })
    }));
  }

  // Retrieves a note by ID and maps them to a Note model
  public getNoteById(id: number) : Observable<Note> {
    this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getNoteById + id, {headers: this.requestHeaders})
    .pipe(map((note:any) => {
      let newNote: Note = {
        id : note.id,
        description : note.description,
        userId : note.user,
        url : note.url,
        tags : note.tags
      };
      return newNote;
    }));
  }

//================= Videos ================

// Retrieves all videos from the DB and maps them to a Video model
  public getAllVideos() : Observable<Video[]> {
    this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getAllVideos, {headers: this.requestHeaders})
    .pipe(map((resp:any) => {
      return resp.map((video:any) => {
        let newVideo: Video = {
          id : video.id,
          description : video.description,
          userId : video.user,
          url : video.url,
          tags : video.tags
        };
        return newVideo;
      })
    }));
  }

  // Retrieves Videos by tag(s) from the DB and maps them to a Video model
  public getVideosByTag(tags: Tag[]) : Observable<Video[]> {
    let tagPath: string = "";
    tags.forEach(tag => {
      tagPath += `${tag.tagid}:${tag.name}:${tag.value}+`;
    });
    tagPath = tagPath.slice(0,-1);
    this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getVideosByTag + tagPath, {headers: this.requestHeaders})
    .pipe(map((resp:any) => {
      return resp.map((video:any) => {
        let newVideo: Video = {
          id : video.id,
          description : video.description,
          userId : video.user,
          url : video.url,
          tags : video.tags
        };
        return newVideo;
      })
    }));
  }

  // Retrieves Video by ID from the DB and maps it to a Video model
  public getVideoById(id: number) : Observable<Video> {
    this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getVideoById + id, {headers: this.requestHeaders})
    .pipe(map((video:any) => {
      let newVideo: Video = {
        id : video.id,
        description : video.description,
        userId : video.user,
        url : video.url,
        tags : video.tags
      };
      return newVideo;
    }));
  }

  
}
