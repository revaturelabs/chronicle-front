import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models/Video';
import { VideoPageTransferService } from 'src/app/services/video-page-transfer.service';

@Component({
  selector: 'app-video-panel',
  templateUrl: './video-panel.component.html',
  styleUrls: ['./video-panel.component.css']
})
// Loops over videos and displays them
export class VideoPanelComponent implements OnInit {


 @Input() video?: Video;

  constructor(private transfer : VideoPageTransferService, private router : Router) { }

  ngOnInit(): void {
  }

  click() : void {
    this.transfer.video = this.video;
    this.router.navigateByUrl("videos/" + this.video?.id)
  }


}
