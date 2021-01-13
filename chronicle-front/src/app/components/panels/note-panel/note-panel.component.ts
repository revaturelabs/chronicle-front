import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/Note';
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

  constructor(private transfer : MediaTransferService, public colorservice : TagColorService, private router : Router) { }

  ngOnInit(): void {
  }

  public getTitleTag() : string {
    if (this.note) {
    for (var val of this.note?.tags) {
      if (val.name == "Title") return val.value;
    }
  }
  return "No Title"
  }

  click() : void {
    this.transfer.note = this.note;
    this.router.navigateByUrl("notes/" + this.note?.id)
  }

}
