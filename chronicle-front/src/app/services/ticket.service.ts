import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient:HttpClient) { }

  findAllPendingTickets():Observable<Ticket[]>{
    return this.httpClient.post('',"") as Observable<Ticket[]>
  }
}
