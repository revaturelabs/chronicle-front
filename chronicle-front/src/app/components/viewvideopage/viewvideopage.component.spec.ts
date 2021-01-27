import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { ViewvideopageComponent } from './viewvideopage.component';

describe('ViewvideopageComponent', () => {
  let component: ViewvideopageComponent;
  let fixture: ComponentFixture<ViewvideopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
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
