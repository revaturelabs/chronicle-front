import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/Note';
import { Tag } from 'src/app/models/Tag';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';
import { MediaTransferService } from 'src/app/services/media-transfer.service';
import { TagColorService } from 'src/app/services/tag-color.service';

@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.css']
})

// loops over notes and displays them
export class NotePanelComponent implements OnInit {


  @Input() note?: Note;

  topics?: Tag[];
  batch?: string;

  constructor(private transfer : MediaTransferService, public colorservice : TagColorService, private router : Router, private mediaService: MediaRetrievalService) { }

  ngOnInit(): void {
    if (this.note) {
      this.topics = this.mediaService.filterTags(this.note.tags, 'Topic');
      this.batch = this.mediaService.filterTags(this.note.tags, 'Batch')[0].value;
    }
    console.log(this.note);
  }


  click() : void {
    this.transfer.note = this.note;
    this.router.navigateByUrl("notes/" + this.note?.id)
  }

}
