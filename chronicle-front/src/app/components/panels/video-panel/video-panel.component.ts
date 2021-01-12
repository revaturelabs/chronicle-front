import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models/Video';
import { MediaTransferService } from 'src/app/services/media-transfer.service';

@Component({
  selector: 'app-video-panel',
  templateUrl: './video-panel.component.html',
  styleUrls: ['./video-panel.component.css']
})
// Loops over videos and displays them
export class VideoPanelComponent implements OnInit {


 @Input() video?: Video;

  constructor(private transfer : MediaTransferService, private router : Router) { }

  ngOnInit(): void {
  }

  click() : void {
    this.transfer.video = this.video;
    this.router.navigateByUrl("videos/" + this.video?.id)
  }
}
