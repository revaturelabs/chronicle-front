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
    console.log(this.noResults)
    this.mediaRetrievalService.allTags = [];
    this.notes = [];
    if(this.mediaRetrievalService.selectedTags.length > 0 || this.mediaRetrievalService.date || this.mediaRetrievalService.selectedBatchTags.length > 0) {
      if(this.mediaRetrievalService.selectedBatchTags.length>0){
        this.mediaRetrievalService.allTags.push(this.mediaRetrievalService.selectedBatchTags[0])
      }
      // if(this.mediaRetrievalService.date){
      //   this.mediaRetrievalService.allTags.push(this.mediaRetrievalService.date)
      // }
      for(let i in this.mediaRetrievalService.selectedTags){
        this.mediaRetrievalService.allTags.push(this.mediaRetrievalService.selectedTags[i])
      }
      console.log("All tags", this.mediaRetrievalService.allTags)
      this.mediaRetrievalService.getNotesByTag(this.mediaRetrievalService.allTags).subscribe(resp => {
        if (resp.length == 0){
          this.noResults = true;
        }
        this.notes = resp;
        console.log("Get Notess by Tag", resp)
      });
    } else if (this.mediaRetrievalService.allTags.length == 0){
      this.mediaRetrievalService.getAllNotes().subscribe(resp => {
        this.notes = resp;
        console.log("Get All Notes",resp)
      });
    }
     this.mediaRetrievalService.allTags= [];
  }

  

}

