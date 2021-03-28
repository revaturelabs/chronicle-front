import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';

import { TicketViewComponent } from './ticket-view.component';

export class MockTicketService extends TicketService{
  findAllPendingTickets():Observable<Ticket[]>
  {
    let mockTickets:Observable<Ticket[]> = of([
      new Ticket(1,1,100,"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", ""),
      new Ticket(3,5,100,"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", ""),
      new Ticket(3,5,100,"java class", "4 of 10", "01:45:56", "01:55:56","https://123", "11331345", 234, "PENDING", "CR 2/26/2021", "")
    ]);
    return mockTickets;
  }

  findAllAcknowledgedTickets(){
    let mockTickets:Observable<Ticket[]> = of([
      new Ticket(1,1,100,"java primitives", "1 of 10", "00:45:56", "00:55:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", ""),
      new Ticket(3,5,100,"java interface", "3 of 10", "01:05:56", "01:20:56","https://123", "11331345", 234, "ACKNOWLEDGED", "CR 2/26/2021", "")
    ])
    return mockTickets;
  }
}

describe('TicketViewComponent', () => {
  let component: TicketViewComponent;
  let fixture: ComponentFixture<TicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketViewComponent ],
      imports:[HttpClientTestingModule],
      providers:[{provide: TicketService, useClass:MockTicketService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find PENDING tickets', () =>{
    component.findAllPendingTickets();
    expect(component.allPendingTickets.length).toEqual(3);

  });

  it('should find ACKNOWLEDGED tickets', () =>{
    component.findAllAcknowledgedTickets();
    expect(component.allAcknowledgedTickets.length).toEqual(2);

  });

  it('should acquire a list of videos uploaded up that user')

  it('should change the status of a ticket to ACKNOWLEDGED')

  it('should change the status of a ticket to IN_PROGRESS')

  it('should change the status of a ticket to UNDER_REVIEW')


});
