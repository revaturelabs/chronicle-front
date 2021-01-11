import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  public errorMsg? : String = undefined;
  

  constructor(private transfer : VideoPageTransferService, private mediaService : MediaRetrievalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.transfer.video) {
      this.video = this.transfer.video;
      this.transfer.video = undefined;
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
        });
      }
     
    }
  }

}
