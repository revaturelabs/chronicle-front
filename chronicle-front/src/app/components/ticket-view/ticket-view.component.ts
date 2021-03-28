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
  allAcknowledgedTickets: Ticket[] = [];

  findAllPendingTickets(){
    this.ticketService.findAllPendingTickets().subscribe(
      (data) => {
        this.allPendingTickets = data;
      },
      () => {

      }
    )
  }

  findAllAcknowledgedTickets(){
    this.ticketService.findAllPendingTickets().subscribe(
      (data) => {
        this.allPendingTickets = data;
      },
      () => {

      }
    )
  }

}
