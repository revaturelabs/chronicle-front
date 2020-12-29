import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadfilePanelComponent } from './uploadfile-panel.component';

describe('UploadfilePanelComponent', () => {
  let component: UploadfilePanelComponent;
  let fixture: ComponentFixture<UploadfilePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadfilePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadfilePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
