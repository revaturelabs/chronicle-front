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
      }

    )
  }
}
