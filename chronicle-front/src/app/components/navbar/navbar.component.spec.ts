import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar.component';



describe('NavbarComponent', () => {

    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let img: HTMLElement;
    let navigateSpy: jasmine.Spy;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                HttpClientModule
            ],
            declarations: [NavbarComponent],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });


});