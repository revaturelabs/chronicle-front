import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/Tag';
import { Video } from 'src/app/models/Video';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';
import { MediaTransferService } from 'src/app/services/media-transfer.service';
import { TagColorService } from 'src/app/services/tag-color.service';

@Component({
  selector: 'app-video-panel',
  templateUrl: './video-panel.component.html',
  styleUrls: ['./video-panel.component.css']
})
// Loops over videos and displays them
export class VideoPanelComponent implements OnInit {


 @Input() video?: Video;

 technologies?: Tag[];
 batch?: string;
 date?: string;
 title?: string;


  constructor(private transfer : MediaTransferService, private router : Router, public colorservice : TagColorService, private mediaService: MediaRetrievalService) { }

  ngOnInit(): void {
    if (this.video) {
      this.technologies = this.mediaService.filterTags(this.video.tags, 'Technology');
      this.batch = this.mediaService.filterTags(this.video.tags, 'Batch')[0].value;
      this.date = this.mediaService.filterTags(this.video.tags, 'Date')[0].value;
      this.title = this.mediaService.filterTags(this.video.tags, 'Title')[0].value;
    }
  }

  click() : void {
    this.transfer.video = this.video;
    this.router.navigateByUrl("videos/" + this.video?.id)
  }
}
