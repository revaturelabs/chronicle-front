import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/Video';

@Component({
  selector: 'app-viewvideopage',
  templateUrl: './viewvideopage.component.html',
  styleUrls: ['./viewvideopage.component.css']
})
export class ViewvideopageComponent implements OnInit {


  @Input() video? : Video;

  constructor() { }

  ngOnInit(): void {
  }

}
