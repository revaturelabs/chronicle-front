import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable}         from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router}           from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) { }

  login(){    
    this.loggedIn.next(true);
    this.router.navigate(['/']);    
  }

  logout() {                            
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
