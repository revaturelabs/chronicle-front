import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvideopageComponent } from './viewvideopage.component';

describe('ViewvideopageComponent', () => {
  let component: ViewvideopageComponent;
  let fixture: ComponentFixture<ViewvideopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewvideopageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvideopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
