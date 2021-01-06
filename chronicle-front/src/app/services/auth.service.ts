import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, fromEventPattern, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';
import { first } from 'rxjs/operators';
import { UserMetadata } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  token?: any;
  displayName?: any;
  email?: any;
  uID?: any;



  constructor(private router: Router, private afAuth: AngularFireAuth) { }


  async getSyncToken(): Promise<string | null | undefined> {

    return await this.afAuth.idToken.pipe(first()).toPromise();

  }

  async getSyncUID(): Promise<string | null | undefined> {

   return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.uid);

  }

  async getSyncDisplayName(): Promise<string | null | undefined> {

    return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.displayName);

   }

   async getSyncEmail(): Promise<string | null | undefined> {

    return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.email);

   }

   async getSyncMetaData(): Promise<string | UserMetadata | null | undefined> {

    return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.metadata);

   }



  login(): void {
    this.router.navigate(['/']);
  }

  logout(): void {

    this.router.navigate(['/login']);

    this.token = null;
    this.displayName = null;
    this.uID = null;
    this.email = null;


    this.afAuth.signOut();
  }
}
