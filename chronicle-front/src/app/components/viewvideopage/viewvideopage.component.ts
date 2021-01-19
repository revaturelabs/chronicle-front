import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from 'src/app/models/Tag';
import { Video } from 'src/app/models/Video';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';
import { MediaTransferService } from 'src/app/services/media-transfer.service';
import { TagColorService } from 'src/app/services/tag-color.service';

@Component({
  selector: 'app-viewvideopage',
  templateUrl: './viewvideopage.component.html',
  styleUrls: ['./viewvideopage.component.css']
})
export class ViewvideopageComponent implements OnInit {


  @Input() video? : Video;
  topics?: Tag[];
  batch?: string;
  public errorMsg? : String = undefined;

  constructor(private transfer : MediaTransferService, private mediaService : MediaRetrievalService, private route: ActivatedRoute, public colorService : TagColorService)  { }

  searchTag(tag : Tag) {
    this.mediaService.searchVideoTag(tag)
  }


  ngOnInit(): void {
    if (this.transfer.video) {
      this.video = this.transfer.video;
      this.transfer.video = undefined;
      this.topics = this.mediaService.filterTags(this.video.tags, 'Topic');
      this.batch = this.mediaService.filterTags(this.video.tags, 'Batch')[0].value;
    } else {
      let id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      if (id == null) {
        this.errorMsg = "Video Not Found";
        console.log("video url not valid");

      } else {

        let idInt = parseInt(id, 10);

        this.mediaService.getVideoById(idInt).subscribe(resp => {
          this.video = resp;
          this.topics = this.mediaService.filterTags(this.video.tags, 'Topic');
          this.batch = this.mediaService.filterTags(this.video.tags, 'Batch')[0].value;
        });
      }
    }
  }
}
