import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';

@Component({
  selector: 'app-notespage',
  templateUrl: './notespage.component.html',
  styleUrls: ['./notespage.component.css']
})
export class NotespageComponent implements OnInit {

  constructor(private mediaService: MediaRetrievalService) { }

  notes?: Note[];


  ngOnInit(): void {

  }

  onSearch(): void {
    this.mediaService.getNotes().subscribe(resp => {
      this.notes = resp;
    });
  }


}
