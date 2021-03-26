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
    return this.httpClient.get('') as Observable<Ticket[]>
  }

  findUnderReviewTickets():Observable<Ticket[]>{
    return this.httpClient.get('') as Observable<Ticket[]>
  }

  findAllSubmittedTickets():Observable<Ticket[]>{
    return this.httpClient.get('') as Observable<Ticket[]>
  }

  updateTicketStatus(status:String):Observable<any>{
    return this.httpClient.post('',status) as Observable<any>
  }

  random()
  {
    
  }
  
}
