import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, fromEventPattern, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';
import { first } from 'rxjs/operators';
import { UserMetadata, User } from '@firebase/auth-types';


@Injectable({
  providedIn: 'root'
})


  /**
 * The authService contains functionality for accessing Synchronous user data
 * 
 * @author Justin Kroh
 * */
export class AuthService {


  token?: any;
  displayName?: any;
  email?: any;
  uID?: any;



  constructor(private router: Router, private afAuth: AngularFireAuth) { }



/**
 * Gets a user object synchronously, useful for reload on init
 * 
 * 
 * @returns Promise of a Firebase User 
 * */
  async getSyncUser(): Promise<User | null> {
    return await this.afAuth.user.pipe(first()).toPromise();
  }

/**
 * Gets a synchrounous user token, needed for reload on init functionality
 * 
 * @returns Promise<string> of a token
 * */
  async getSyncToken(): Promise<string | null | undefined> {

    return await this.afAuth.idToken.pipe(first()).toPromise();

  }

  /**
 * Gets a synchrounous user token, needed for reload on init functionality
 * 
 * @returns Promise<string> of a idtoken result
 * */
  async getSyncIDTokenResult() {

    let user = await this.getSyncUser();

   return await user?.getIdTokenResult();

  }

/**
 * Gets a synchrounous user id, needed for reload on init functionality
 * 
 * @returns Promise<string> of a uID
 * */
  async getSyncUID(): Promise<string | null | undefined> {

   return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.uid);

  }

  /**
 * Gets a synchrounous display name, needed for reload on init functionality
 * 
 * @returns Promise<string> of a display name
 * */
  async getSyncDisplayName(): Promise<string | null | undefined> {

    return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.displayName);

   }


/**
 * Gets a synchrounous user email, needed for reload on init functionality
 * 
 * @returns Promise<string> of a email
 * */
   async getSyncEmail(): Promise<string | null | undefined> {

    return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.email);

   }


   /**
 * Gets a synchrounous user MetaData object, needed for reload on init functionality
 * 
 * @returns Promise<UserMetadata> of type UserMetaData
 * */
   async getSyncMetaData(): Promise<string | UserMetadata | null | undefined> {

    return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.metadata);

   }



  login(): void {
    this.router.navigate(['/']);
  }


/**
 * Logs out the user, destroys token in IndexedDB, nulls out asynchrounous values
 * 
 * */
  logout(): void {

    this.router.navigate(['/login']);

    this.token = null;
    this.displayName = null;
    this.uID = null;
    this.email = null;


    this.afAuth.signOut();
  }
}
