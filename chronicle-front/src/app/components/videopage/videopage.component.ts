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
    this.videos = [];
    //Demo
    let video : Video = {
      id: 1,
      description: 'a video',
      userId: '123',
      url: 'https://via.placeholder.com/600x400',
      tags: []
    }
    for(let i = 0; i < 10; i++){
      console.log(this.videos?.push(video));
    }
  }

  onSearch(): void {
    this.mediaRetrievalService.getVideosByTag(this.mediaRetrievalService.selectedTags).subscribe(resp => {
      this.videos = resp;
      console.log(resp)
    });
    
  }


}
