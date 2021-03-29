import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent implements OnInit {
private zoomURL:String ='';
private timeStampRowCount:number =0;
  constructor() { }

  ngOnInit(): void {
  }

  zoomUrlValidator(zoomUrl:String):boolean {
    return zoomUrl.startsWith('https://revature.zoom.us/rec/share');
  }

  timeStampValidator() {

  }

  rowCountIncrementor() {

  }

  rowCountValidator() {

  }

  rowCountDecrementor() {

  }

  submitTimeStamps() {

  }

}
