import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-ticket-approval',
  templateUrl: './ticket-approval.component.html',
  styleUrls: ['./ticket-approval.component.css']
})
export class TicketApprovalComponent implements OnInit {

  underReviewTickets:Ticket[] =[]
  allSubmittedTickets:Ticket[]=[]
  displayWaitingForReview:boolean = true;
  waitingForReview_nav_color = "orange";
  inProgress_nav_color = "grey";

  clicked:boolean[] = [];

  tempTicket:Ticket = new Ticket(0,'0','0',new Date(),new Date(),"ticket", "", "", "","", "", 0, "", "", "","");
  rejectComment:string = "";


  approveMessage:string = "Must watch Edited Clip Before Approving Ticket";
  rejectMessage:string = "Must enter a comment to reject ticket";
  action:string = "Close";

  constructor(private ticketService: TicketService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.findUnderReviewTickets()
  }

  toggleDisplayPending(b:boolean){
    this.displayWaitingForReview = b;
    if(b){
      this.findUnderReviewTickets();
      this.waitingForReview_nav_color = "orange";
      this.inProgress_nav_color = "grey"
    }else{
      this.findAllSubmittedTickets();
      this.waitingForReview_nav_color =  "grey";
      this.inProgress_nav_color = "orange"
    }
  }


  findUnderReviewTickets(){
    this.ticketService.findUnderReviewTickets().subscribe(
      (data) =>{
        this.underReviewTickets = data;
        for(let i=0; i<this.underReviewTickets.length; i++){
          this.clicked.push(false);
        }
      },
      () =>{
        console.log("error in ticket approval component")
      }

    )
  }

   findAllSubmittedTickets(){
     this.ticketService.findAllSubmittedTickets().subscribe(
       (data)=>{
         this.allSubmittedTickets = data;
       },
       ()=>{
        console.log("error in ticket approval component")
       }
     )
   } 

  approveTicket(ticket:Ticket,i:number){
    ticket.ticketStatus = "APPROVED";
    this.tempTicket = ticket;

    console.log(ticket);

    if(this.clicked[i]){
       //backend changed so we need to call approve ticket
      this.ticketService.approveTicket(ticket).subscribe(
      (data)=>{
        console.log("ticket has been updated" +data)
        //will only work once DB connection is working
        this.findUnderReviewTickets();
        //maybe add in alert or message saying ticket was approved
      },
      ()=>{
        console.log("error in approving ticket")
      }
    )
    this.clicked[i] =false;
    }else{
      this.openApproveSnackBar(this.approveMessage,this.action);
    }
  }

  rejectTicket(ticket:Ticket){
    ticket.ticketStatus = "IN_PROGRESS";
    //ticket.rejectComment = ticket.rejectComment;
    this.tempTicket = ticket;
    this.rejectComment = ticket.rejectComment;

    if(ticket.rejectComment==null){
      this.openRejectSnackBar(this.rejectMessage,this.action);
    }else{
      //backednc ahnged so we need to call rejectTicket
      this.ticketService.rejectTicket(ticket).subscribe(
        (data)=>{
          console.log("ticket has been updated" +data)
          //will only work once DB connection is working
          this.findUnderReviewTickets();
          //maybe add in alert or message saying the ticket was rejected
        },
        ()=>{
          
        }
      )
    }

  }

  linkedClick(i:number){
    this.clicked[i] = true;
  }

  openRejectSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openApproveSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
