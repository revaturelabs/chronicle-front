import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            HttpClientModule,
        ],
        declarations: [NavbarComponent, MatAutocomplete],
    })
    .compileComponents();
});

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});