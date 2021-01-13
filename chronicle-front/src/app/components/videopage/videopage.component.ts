import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/Video';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.css']
})
export class VideopageComponent implements OnInit {
  
  videos?: Video[];

  @Input()
  noResults: boolean= false;

  constructor(private mediaRetrievalService: MediaRetrievalService) {  }

  ngOnInit(): void {
    
  }
 
    // Recieves the tags selected by the user in the search bar and finds videos with those tags
  onSearch(): void {
    this.noResults = false;
    this.mediaRetrievalService.allTags = [];
    this.videos = [];
    if(this.mediaRetrievalService.selectedTags.length > 0 || this.mediaRetrievalService.selectedBatchTags.length > 0) {
      if(this.mediaRetrievalService.selectedBatchTags.length>0){
        this.mediaRetrievalService.allTags.push(this.mediaRetrievalService.selectedBatchTags[0])
      }
      
      for(let i in this.mediaRetrievalService.selectedTags){
        this.mediaRetrievalService.allTags.push(this.mediaRetrievalService.selectedTags[i])
      }
      console.log("All tags", this.mediaRetrievalService.allTags)
      this.mediaRetrievalService.getVideosByTag(this.mediaRetrievalService.allTags).subscribe(resp => {
        
       
        
        if (resp.length == 0){
          this.noResults = true;
        }
        this.videos = resp;
        console.log("Get Videos by Tag", resp)
      });
    } 
    else if (this.mediaRetrievalService.allTags.length == 0){
      this.mediaRetrievalService.getAllVideos().subscribe(resp => {
        if(this.mediaRetrievalService.date){
          console.log(this.mediaRetrievalService.date)
          this.videos = resp.filter(video =>{
            console.log(video.date)
            video.date == this.mediaRetrievalService.date;
          } )

        }else{
          this.videos = resp;
          console.log("Get All Videos",resp)
        }
      });
    }
  
     this.mediaRetrievalService.allTags= [];
  }
}
