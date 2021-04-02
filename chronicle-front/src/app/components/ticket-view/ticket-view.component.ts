import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  constructor(private ticketService: TicketService, private authService:AuthService) { }
  ngOnInit(): void {
    this.findAllPendingTickets();
    this.authService.User.subscribe(user1 => {
      this.user = user1;
    });

    console.log(this.user.uid)
    
  }

  user: any;
  allPendingTickets: Ticket[] = [];
  allMyTickets: Ticket[] = [];
  tempTicket:Ticket = new Ticket(0,'0','0',new Date(),new Date(),"", "", "", "","", "", 0, "", "", "","");
  displayPending:boolean = true;
  pendings_nav_color = "orange";
  accepted_nav_color = "grey";
  errorMessage:string = "Please make sure the ticket is 'In progress' and have a edited video.";
  hasError:boolean = false;

  toggleDisplayPending(b:boolean){
    this.displayPending = b;
    if(b){
      this.findAllPendingTickets();
      this.pendings_nav_color = "orange";
      this.accepted_nav_color = "grey"
    }else{
      this.findAllMyTickets();
      this.pendings_nav_color =  "grey";
      this.accepted_nav_color = "orange"
    }
  }

  findAllPendingTickets(){
    this.ticketService.findAllPendingTickets().subscribe(
      (data) => {
        this.allPendingTickets = data;
        console.log("pending request was successful.");
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
        console.log(data)
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
        this.findAllMyTickets();
      },
      () => {
        console.log("Ticket Update Failed")
        this.findAllMyTickets();
      }
    )
  }

  acceptTicket(ticket:Ticket){
    ticket.ticketStatus = "ACKNOWLEDGED"
    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        this.findAllPendingTickets()
        console.log(this.user.uid)
      },
      () => {
        this.findAllPendingTickets()
        console.log("Ticket accept Failed")
      }
    )
  }

  updateTicketStatusToInProgress(ticket:Ticket){
    ticket.ticketStatus = "IN_PROGRESS"
    this.tempTicket = ticket;

    this.ticketService.updateTicketStatus(ticket).subscribe(
      (data) => {
        console.log("ticket has been updated"+data)
        this.findAllMyTickets();
      },
      () => {
        console.log("Ticket Update Failed")
        this.findAllMyTickets();
      }
    )
  }

  updateTicketStatusToUnderReview(ticket:Ticket){
    
    this.tempTicket = ticket;
    
    if(ticket.ticketStatus == 'IN_PROGRESS' && ticket.clipID != null){
      this.displayError(false);
      ticket.ticketStatus = "UNDER_REVIEW"
      this.ticketService.updateTicketStatus(ticket).subscribe(
        (data) => {
          console.log("ticket has been updated"+data)
          this.findAllMyTickets();
        },
        () => {
          this.findAllMyTickets();
        }
      )
    }else{
      this.displayError(true);
    }
    
  }

  displayError(b:boolean){
    this.hasError = b;
  }

}
