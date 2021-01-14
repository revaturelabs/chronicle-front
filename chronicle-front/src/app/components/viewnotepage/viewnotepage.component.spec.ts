import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { ViewnotepageComponent } from './viewnotepage.component';

describe('ViewnotepageComponent', () => {
  let component: ViewnotepageComponent;
  let fixture: ComponentFixture<ViewnotepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
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
