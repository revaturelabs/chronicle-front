import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketApprovalComponent } from './ticket-approval.component';

describe('TicketApprovalComponent', () => {
  let component: TicketApprovalComponent;
  let fixture: ComponentFixture<TicketApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
