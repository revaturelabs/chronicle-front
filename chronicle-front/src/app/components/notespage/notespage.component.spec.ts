import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { NotespageComponent } from './notespage.component';

describe('NotespageComponent', () => {
  let component: NotespageComponent;
  let fixture: ComponentFixture<NotespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
      declarations: [ NotespageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
