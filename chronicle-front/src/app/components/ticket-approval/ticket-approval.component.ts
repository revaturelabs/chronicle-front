import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';

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


  tempTicket:Ticket = new Ticket(0,'0','0',new Date(),new Date(),"ticket", "", "", "","", "", 0, "", "", "","");
  rejectComment:string = "ghgh";

  constructor(private ticketService: TicketService) { }

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
      },
      () =>{
        console.log("error in ticket approval component")
        //this is just for test purposes instead of hitting database
        this.underReviewTickets = [new Ticket(1,'1','100',new Date(),new Date(),"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "under review", "CR 2/26/2021", "",""),
        new Ticket(3,'5','100',new Date(),new Date(),"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "under review", "CR 2/26/2021", "",""),
        new Ticket(3,'5','100',new Date(),new Date(),"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "under review", "CR 2/26/2021", "","")];
 
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

  approveTicket(ticket:Ticket){
    ticket.ticketStatus = "APPROVED";
    this.tempTicket = ticket;

    console.log(ticket);

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
  }

  rejectTicket(ticket:Ticket){
    console.log(ticket);
    console.log("Comment "+ticket.rejectComment);
    ticket.ticketStatus = "IN_PROGRESS";
    //ticket.rejectComment = ticket.rejectComment;
    this.tempTicket = ticket;
    this.rejectComment = ticket.rejectComment;

    if(ticket.rejectComment==""){
      alert("Must Enter A Rejection Comment");

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

}
