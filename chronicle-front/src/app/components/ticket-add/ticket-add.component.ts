import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';



@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent implements OnInit {
 _zoomURL:string ='';
 _topicCount:number = 1;
 topicName:string = '';
 _tickets:Ticket[] = [];
 _newTicket:Ticket = new Ticket(0,'0','0',"", "", "", "","", "", 0, "", "", "","");
 _returnTickets:Ticket[] = [];
passcode: string = '';
identifier: string = '';
topic: string = '';
startTime: string = '';
endTime: string = '';
description: string = '';

visibility:boolean = true;

public get topicCountGetter() {
  return this._topicCount;
}

public set topicCount(count:number) {
  this._topicCount = count;
}

public get returnTicketGetter() {
  return this._returnTickets;
}

  constructor(private ticketService:TicketService) { }

  ngOnInit(): void {
  }

  onZoomUrlWritten(event:any):boolean{
    console.log(event);
    return this.zoomUrlValidator(event.value);
  }


  zoomUrlValidator(zoomUrl:string):boolean {
    return zoomUrl.startsWith('https://revature.zoom.us/rec/share');
  }

  timeStampFormatValidator(startTime:string, endTime:string):boolean {
    let regexp = new RegExp('[0-9]{2}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}');
    //check if both timestamps are valid
    if(!(regexp.test(startTime) && regexp.test(endTime))) return false;
    else return true;
  }

  timeStampOrderValidator(startTime:string, endTime:string):boolean {
    //parse the timestamp into numbers
    let x:number = parseInt(startTime.replace(":","").replace(":",""));
    let y:number = parseInt(endTime.replace(":","").replace(":",""));

    //check if the starting time is earlier 
    if(x > y) return false;
    //return a true value
    else return true;
  }

  topicCountIncrementor() {
    if (this.topicCountValidator()) {
    this._topicCount++;} else {
      this.visibility = false;
    }
  }

  topicCountValidator():boolean{
    if(this._topicCount > 10) return false;
    else return true;
  }

  topicCountDecrementor() {
    this._topicCount--;
  }

  submitTickets() {
    this.ticketService.submitTickets(this._tickets).subscribe(
      (data) => {
        this._returnTickets = data;
        console.log('Successfully submitted tickets.');
      },
      () => {
        console.log('Failure in submitted tickets.');
      }
    )
  }

  deleteTopic(ticket:Ticket) {
    if(this._tickets.includes(ticket)) {
      const index = this._tickets.indexOf(ticket, 0);
      if (index > -1) {
      this._tickets.splice(index, 1);
  }

    }
  }

}
