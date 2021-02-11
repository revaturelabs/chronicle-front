import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';

@Component({
  selector: 'app-notespage',
  templateUrl: './notespage.component.html',
  styleUrls: ['./notespage.component.css']
})
export class NotespageComponent implements OnInit, OnDestroy {

  constructor(private mediaRetrievalService: MediaRetrievalService) { }

  notes?: Note[];

  @Input()
  noResults: boolean = false;

   //Clears search tags on destroy
   ngOnDestroy(): void {
    this.mediaRetrievalService.selectedTags = [];
    this.mediaRetrievalService.selectedBatchTags =[];
  }

  ngOnInit(): void {

  }
  // Recieves the tags selected by the user in the search bar and finds notes with those tags
  onSearch(): void {
    this.noResults = false;
    this.mediaRetrievalService.allTags = [];
    this.notes = [];
    if(this.mediaRetrievalService.selectedTags.length > 0 || this.mediaRetrievalService.selectedBatchTags.length > 0 || this.mediaRetrievalService.date) {
      if(this.mediaRetrievalService.selectedBatchTags.length>0){
        this.mediaRetrievalService.allTags.push(this.mediaRetrievalService.selectedBatchTags[0])
      }
      for(let i in this.mediaRetrievalService.selectedTags){
        this.mediaRetrievalService.allTags.push(this.mediaRetrievalService.selectedTags[i])
      }
      console.log("All tags", this.mediaRetrievalService.allTags)
      if (this.mediaRetrievalService.allTags.length > 0) {
        this.mediaRetrievalService.getNotesByTag(this.mediaRetrievalService.allTags).subscribe(resp => {
          if (resp.length == 0){
            this.noResults = true;
          }
          if (this.mediaRetrievalService.date) {
            this.notes = resp.filter(video => video.date == this.mediaRetrievalService.date);
            if (this.notes.length == 0){
              this.noResults = true;
            }
          } else {
            this.notes = resp;
            console.log("Get notes by Tag", resp)
          }
        });
      } else {
        this.mediaRetrievalService.getAllNotes().subscribe(resp => {
          if(this.mediaRetrievalService.date){
            this.notes = resp.filter(video =>video.date == this.mediaRetrievalService.date)
            if (this.notes.length == 0){
              this.noResults = true;
            }
          } else {
            this.notes = resp;
            if (this.notes.length == 0){
              this.noResults = true;
            }
          }
        })
      }
    } else {
      this.mediaRetrievalService.getAllNotes().subscribe(resp => {
        this.notes = resp;
        if (this.notes.length == 0){
          this.noResults = true;
        }
      })
    }
    this.mediaRetrievalService.allTags= [];
  }
}

