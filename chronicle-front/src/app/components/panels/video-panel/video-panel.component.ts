import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/Video';

@Component({
  selector: 'app-video-panel',
  templateUrl: './video-panel.component.html',
  styleUrls: ['./video-panel.component.css']
})
// Loops over videos and displays them
export class VideoPanelComponent implements OnInit {


 @Input() video?: Video;

  constructor() { }

  ngOnInit(): void {
  }

}
