import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/Video';

@Component({
  selector: 'app-video-panel',
  templateUrl: './video-panel.component.html',
  styleUrls: ['./video-panel.component.css']
})
export class VideoPanelComponent implements OnInit {


 @Input() video? : Video;

  constructor() { }

  ngOnInit(): void {
  }

}
