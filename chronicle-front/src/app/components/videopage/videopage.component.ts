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

  onSearch(): void {
    this.mediaRetrievalService.getVideosByTag(this.mediaRetrievalService.selectedTags).subscribe(resp => {
      this.videos = resp;
      console.log(resp)
    });
    
  }


}
