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

  tempTicket:Ticket = new Ticket(0,'0','0',new Date(),new Date(),"", "", "", "","", "", 0, "", "", "","");
  rejectComment:string = "";

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.findUnderReviewTickets()
  }

  findUnderReviewTickets(){
    this.ticketService.findUnderReviewTickets().subscribe(
      (data) =>{
        this.underReviewTickets = data;
      },
      () =>{
        console.log("error in ticket approval component")
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

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data)=>{
        console.log("ticket has been updated" +data)
      },
      ()=>{

      }
    )
  }

  rejectTicket(ticket:Ticket,rejectComment:string){
    ticket.ticketStatus = "IN_PROGRESS";
    ticket.rejectComment = rejectComment;
    this.tempTicket = ticket;
    this.rejectComment = rejectComment;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data)=>{
        console.log("ticket has been updated" +data)
      },
      ()=>{
        
      }
    )
  }

}
