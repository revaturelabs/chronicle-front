import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';

@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.css']
})
export class NotePanelComponent implements OnInit {


  @Input() note? : Note;

  constructor() { }

  ngOnInit(): void {
  }

}
