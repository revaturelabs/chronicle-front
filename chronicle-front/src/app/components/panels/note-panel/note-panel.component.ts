import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { TagColorService } from 'src/app/services/tag-color.service';

@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.css']
})

// loops over notes and displays them
export class NotePanelComponent implements OnInit {


  @Input() note?: Note;

  constructor(public colorservice : TagColorService) { }

  ngOnInit(): void {
  }

}
