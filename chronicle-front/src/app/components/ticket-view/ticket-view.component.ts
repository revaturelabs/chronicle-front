import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.findAllPendingTickets();
  }

  allPendingTickets: Ticket[] = [];
  allMyTickets: Ticket[] = [];

  tempTicket:Ticket = new Ticket(0,'0','0',new Date(),new Date(),"", "", "", "","", "", 0, "", "", "","");

  displayPending:boolean = true;

  toggleDisplayPending(b:boolean){
    this.displayPending = b;
    if(b){
      this.findAllPendingTickets();
    }else{
      this.findAllMyTickets();
    }
  }

  findAllPendingTickets(){
    this.ticketService.findAllPendingTickets().subscribe(
      (data) => {
        this.allPendingTickets = data;
      },
      () => {
        let mockTickets:Ticket[] = [
          new Ticket(1,'1','100',new Date(),new Date(),"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "",""),
          new Ticket(3,'5','100',new Date(),new Date(),"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "",""),
          new Ticket(3,'5','100',new Date(),new Date(),"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "","")
        ];
        this.allPendingTickets = mockTickets;
      }
    )
  }

  findAllMyTickets(){
    this.ticketService.findAllTicketsByEditor().subscribe(
      (data) => {
        this.allMyTickets = data;
      },
      () => {
        let mockTickets:Ticket[] = [
          new Ticket(6,'1','100',new Date(),new Date(),"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "IN_PROGRESS", "CR 2/26/2021", "",""),
          new Ticket(7,'5','100',new Date(),new Date(),"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "",""),
          new Ticket(8,'5','100',new Date(),new Date(),"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "","")
        ];
        this.allMyTickets = mockTickets;
      }
    )
  }

  updateTicketStatusToAcknowledged(ticket:Ticket){
    ticket.ticketStatus = "ACKNOWLEDGED"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        console.log("ticket has been updated"+data)
      },
      () => {
        console.log("Ticket Update Failed")
      }
    )
  }

  updateTicketStatusToInProgress(ticket:Ticket){
    ticket.ticketStatus = "IN_PROGRESS"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        console.log("ticket has been updated"+data)
      },
      () => {
        console.log("Ticket Update Failed")
      }
    )
  }

  updateTicketStatusToUnderReview(ticket:Ticket){
    ticket.ticketStatus = "UNDER_REVIEW"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        console.log("ticket has been updated"+data)
      },
      () => {

      }
    )
  }

  updateTicketStatusToDeactivated(ticket:Ticket){
    ticket.ticketStatus = "DEACTIVATED"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        console.log("ticket has been updated"+data)
      },
      () => {

      }
    )
  }

}
