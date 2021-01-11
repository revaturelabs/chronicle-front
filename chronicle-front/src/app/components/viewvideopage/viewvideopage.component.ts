import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/Video';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';
import { VideoPageTransferService } from 'src/app/services/video-page-transfer.service';

@Component({
  selector: 'app-viewvideopage',
  templateUrl: './viewvideopage.component.html',
  styleUrls: ['./viewvideopage.component.css']
})
export class ViewvideopageComponent implements OnInit {


  @Input() video? : Video;

  constructor(private transfer : VideoPageTransferService, private mediaService : MediaRetrievalService) { }

  ngOnInit(): void {
    if (this.transfer.video) {
      this.video = this.transfer.video;
      this.transfer.video = undefined;
    } else {
     this.mediaService.getVideoById(1).subscribe(resp => {
       this.video = resp;
     });
    }
  }

}
