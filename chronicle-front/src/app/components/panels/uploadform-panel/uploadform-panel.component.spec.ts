import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadformPanelComponent } from './uploadform-panel.component';

describe('UploadformPanelComponent', () => {
  let component: UploadformPanelComponent;
  let fixture: ComponentFixture<UploadformPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadformPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadformPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
