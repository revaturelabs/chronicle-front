import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';

import { SearchbarComponent } from './searchbar.component';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
      declarations: [ SearchbarComponent, MatAutocomplete ],
    
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
