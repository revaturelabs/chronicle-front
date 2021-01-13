import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnotepageComponent } from './viewnotepage.component';

describe('ViewnotepageComponent', () => {
  let component: ViewnotepageComponent;
  let fixture: ComponentFixture<ViewnotepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewnotepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnotepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
