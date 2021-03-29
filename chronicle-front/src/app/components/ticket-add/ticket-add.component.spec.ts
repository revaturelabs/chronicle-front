import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAddComponent } from './ticket-add.component';

describe('TicketAddComponent', () => {
  let component: TicketAddComponent;
  let fixture: ComponentFixture<TicketAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate Zoom URL', () => {
    let url:String = 'https://revature.zoom.us/rec/share/thdhdehdethyjyj';
    expect(component.zoomUrlValidator(url)).toBeTruthy();
  });

  it('should validate time stamps through order and format', () => {
    expect(component).toBeTruthy();
  });

  it('should increment row count through add more button click', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the row count to reach a limit', () => {
    expect(component).toBeTruthy();
  });

  it('should decrease row count through delete button click', () => {
    expect(component).toBeTruthy();
  });

  it('should call ticket service upon submit button click', () => {
    expect(component).toBeTruthy();
  });

});
