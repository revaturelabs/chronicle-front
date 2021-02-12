import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWhitelistComponent } from './edit-whitelist.component';

describe('EditWhitelistComponent', () => {
  let component: EditWhitelistComponent;
  let fixture: ComponentFixture<EditWhitelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWhitelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWhitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
