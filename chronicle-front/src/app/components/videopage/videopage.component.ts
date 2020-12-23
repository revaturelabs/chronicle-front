import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/Video';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.css']
})
export class VideopageComponent implements OnInit {

  constructor(private mediaService: MediaRetrievalService) { }

  videos? : Video[];


  ngOnInit(): void {

    

  }

  onSearch(){
    this.mediaService.getVideos().subscribe(resp => {
      this.videos = resp;
    })
  }


}
