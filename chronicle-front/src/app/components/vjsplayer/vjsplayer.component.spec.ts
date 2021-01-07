import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VjsplayerComponent } from './vjsplayer.component';

describe('VjsplayerComponent', () => {
  let component: VjsplayerComponent;
  let fixture: ComponentFixture<VjsplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VjsplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VjsplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
