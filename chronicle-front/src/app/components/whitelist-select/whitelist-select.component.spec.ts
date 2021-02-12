import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistSelectComponent } from './whitelist-select.component';

describe('WhitelistSelectComponent', () => {
  let component: WhitelistSelectComponent;
  let fixture: ComponentFixture<WhitelistSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitelistSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
