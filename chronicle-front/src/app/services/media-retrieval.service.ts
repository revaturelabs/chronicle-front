import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concatMap, map, switchMap, take } from 'rxjs/operators';
import { Note } from '../models/Note';
import { Tag } from '../models/Tag';
import { Video } from '../models/Video';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MediaRetrievalService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  private requestHeaders = new HttpHeaders();

  selectedTags: Tag[] = [];
  selectedBatchTags: Tag[] =[];
  allTags: Tag[] =[];
  date?: string;


  // ====== Utility ============  

  // Sets authentication headers
  // async setHeaders() {
  //   const authToken = await this.authService.getSyncToken();
  //   this.requestHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${authToken}`
  //   })
  // }


  public searchVideoTag(tag : Tag){
    if (tag.type == "Topic") {
    this.selectedTags = [tag];
    this.router.navigateByUrl('/videos');
    }
  }

  public searchNoteTag(tag : Tag){
    if (tag.type == "Topic") {
    this.selectedTags = [tag];
    this.router.navigateByUrl('/notes');
    }
  }


  // Retrieves all tags from the db and maps them to a Tag model
  // Utility function to filter tags by their 'name'
  public filterTags(allTags: Tag[], tagName: string): Tag[] {
    return allTags.filter(tag => tag.type == tagName);
  }

 public formatDate(input: string){
   let split = input.split("T");
   console.log();
  return split[0];
 }

  public getAllTags() : Observable<Tag[]>{
    // this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getTags, {headers: this.requestHeaders})
    .pipe(map((resp:any) => {
      return resp.map((tag:any) => {
        let newTag: Tag = {
          tagID: tag.tagID,
          type: tag.type,
          value: tag.value
        };
        return newTag;
      })
    }));
  }


//============ Notes ===================

//Retrieves all notes from the DB and maps them to a Note model
  public getAllNotes() : Observable<Note[]> {
    // this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getAllNotes, {headers: this.requestHeaders})
    .pipe(map((resp:any) => {
      return resp.map((note:any) => {
        let newNote: Note = {
          id : note.id,
          description : note.description,
          title: note.title,
          date: this.formatDate(note.date),
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
      tagPath += `${tag.tagID}:${tag.type}:${tag.value}+`;
    });
    tagPath = tagPath.slice(0,-1);
    // this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getNotesByTag + tagPath, {headers: this.requestHeaders})
    .pipe(map((resp:any) => {
      return resp.map((note:any) => {
        let newNote: Note = {
          id : note.id,
          description : note.description,
          title: note.title,
          date: this.formatDate(note.date),
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
    // this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getNoteById + id, {headers: this.requestHeaders})
    .pipe(map((note:any) => {
      let newNote: Note = {
        id : note.id,
        description : note.description,
        title: note.title,
        date: this.formatDate(note.date),
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
    // this.setHeaders();
    console.log("SearchAll")
    return this.httpClient.get(environment.serverApiUrls.getAllVideos, {headers: this.requestHeaders})
    .pipe(map((resp:any) => {
      return resp.map((video:any) => {
        let newVideo: Video = {
          id : video.id,
          description : video.description,
          title: video.title,
          date: this.formatDate(video.date),
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
    console.log("search tags here" + tags[0])
    console.log(tags)
    tags.forEach(tag => {
      tagPath += `${tag.tagID}:${tag.type}:${tag.value}+`;
    });
    console.log("SearchHere")
    console.log("tagPath: " + tagPath);
    tagPath = tagPath.slice(0,-1);
    // this.setHeaders();
    return this.httpClient.get(environment.serverApiUrls.getVideosByTag + tagPath, {headers: this.requestHeaders})
    .pipe(map((resp:any) => {
      return resp.map((video:any) => {
        let newVideo: Video = {
          id : video.id,
          description : video.description,
          title: video.title,
          date: this.formatDate(video.date),
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
    // this.setHeaders();
    console.log("SearchID");
    
    return this.httpClient.get(environment.serverApiUrls.getVideoById + id, {headers: this.requestHeaders})
    .pipe(map((video:any) => {
      let newVideo: Video = {
        id : video.id,
        description : video.description,
        title: video.title,
        date: this.formatDate(video.date),
        userId : video.user,
        url : video.url,
        tags : video.tags
      };
      return newVideo;
    }));
  }

  
}
