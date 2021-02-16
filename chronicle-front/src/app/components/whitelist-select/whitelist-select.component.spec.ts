import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WhitelistSelectComponent } from './whitelist-select.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { MatAutocompleteModule} from '@angular/material/autocomplete';


describe('WhitelistSelectComponent', () => {
  let component: WhitelistSelectComponent;
  let fixture: ComponentFixture<WhitelistSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitelistSelectComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        MatAutocompleteModule
        ]
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
