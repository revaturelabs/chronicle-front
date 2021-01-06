import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable}         from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router}           from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';
import { first } from 'rxjs/operators';
//import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  token?: any;
  displayName?: any;
  email?: any;
  uID?: any;



  constructor(private router: Router, private afAuth: AngularFireAuth) { }


  async getSyncToken() {
    
    return await this.afAuth.idToken.pipe(first()).toPromise();

  }

  async getSyncUID() {

   return await this.afAuth.user.pipe(first()).toPromise().then(user => {return user?.uid});

  }

  async getSyncDisplayName() {
    
    return await this.afAuth.user.pipe(first()).toPromise().then(user => {return user?.displayName});
 
   }

   async getSyncEmail() {
    
    return await this.afAuth.user.pipe(first()).toPromise().then(user => {return user?.email});
 
   }

   async getSyncMetaData() {
    
    return await this.afAuth.user.pipe(first()).toPromise().then(user => {return user?.metadata});
 
   }



  login(){    
    this.router.navigate(['/']);    
  }

  logout() {                            

    this.router.navigate(['/login']);

    this.token = null;
    this.displayName = null;
    this.uID = null;
    this.email = null;


    this.afAuth.signOut();
  }
}
