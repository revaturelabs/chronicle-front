import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/Video';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.css']
})
export class VideopageComponent implements OnInit {

  constructor(private mediaRetrievalService: MediaRetrievalService) { }

  videos?: Video[];


  ngOnInit(): void {

  }
    // Recieves the tags selected by the user in the search bar and finds videos with those tags
  onSearch(): void {
    if(this.mediaRetrievalService.selectedTags.length > 0) {
      if(this.mediaRetrievalService.selectedBatchTags.length>0){
        this.mediaRetrievalService.allTags.push(this.mediaRetrievalService.selectedBatchTags[0])
      }
      for(let i in this.mediaRetrievalService.selectedTags){
        this.mediaRetrievalService.allTags.push(this.mediaRetrievalService.selectedTags[i])
      }
      console.log("All tags", this.mediaRetrievalService.allTags)
      this.mediaRetrievalService.getVideosByTag(this.mediaRetrievalService.allTags).subscribe(resp => {
        this.videos = resp;
        console.log("Get Videos by Tag", resp)
      });
    } else {
      this.mediaRetrievalService.getAllVideos().subscribe(resp => {
        this.videos = resp;
        console.log("Get All Videos",resp)
      });
    }
     this.mediaRetrievalService.allTags= [];
    // this.mediaRetrievalService.selectedTags= [];
    // this.mediaRetrievalService.selectedBatchTags= [];
  }
}
