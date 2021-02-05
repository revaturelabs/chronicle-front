import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, fromEventPattern, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';
import { first } from 'rxjs/operators';
import { UserMetadata, User, IdTokenResult } from '@firebase/auth-types';


@Injectable({
  providedIn: 'root'
})


  /**
 * The authService contains functionality for accessing Synchronous user data.
 * This class is created to solve the issue of a Page Reload and the initialization of componenent happening at the same time.
 * User data is null on the initialization of the app because the app reaches out to the google apis to either reverify the validility of the token or to get a new one.
 *
 * Short term explanation - Avoid using firebase.auth().xx where possible
 *
 * @author Justin Kroh
 * */
export class AuthService {

  /**
 * This behavior subject is the logged in user.
 * It is set to private to enforce a call to Firebase when the getter is called.
   */
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  get User(): BehaviorSubject<User | null> {
    if (!this.user.value)
      this.afAuth.user.pipe(first()).subscribe(user => this.user.next(user));
    return this.user;
  }
  setUser(user: User) {
    this.user.next(user);
  }

  /**
 * Asynchronous Varaibles, use in HTML, but not in API calls
 * */
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
  // async getSyncUser(): Promise<User | null> {
  //   return await this.afAuth.user.pipe(first()).toPromise();
  // }

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
  // async getSyncIDTokenResult(): Promise<IdTokenResult | undefined> {

  //   let user = await this.getSyncUser();

  //  return await user?.getIdTokenResult();

  // }

/**
 * Gets a synchrounous user id, needed for reload on init functionality
 *
 * @returns Promise<string> of a uID
 * */
  // async getSyncUID(): Promise<string | null | undefined> {

  //  return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.uid);

  // }

  /**
 * Gets a synchrounous display name, needed for reload on init functionality
 *
 * @returns Promise<string> of a display name
 * */
  // async getSyncDisplayName(): Promise<string | null | undefined> {

  //   return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.displayName);

  //  }


/**
 * Gets a synchrounous user email, needed for reload on init functionality
 *
 * @returns Promise<string> of a email
 * */
  //  async getSyncEmail(): Promise<string | null | undefined> {

  //   return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.email);

  //  }


   /**
 * Gets a synchrounous user MetaData object, needed for reload on init functionality
 *
 * @returns Promise<UserMetadata> of type UserMetaData
 * */
  //  async getSyncMetaData(): Promise<string | UserMetadata | null | undefined> {

  //   return await this.afAuth.user.pipe(first()).toPromise().then(user => user?.metadata);

  //  }



  login(): void {
    this.router.navigate(['/']);
  }


/**
 * Logs out the user, destroys token in IndexedDB, nulls out asynchrounous values
 *
 * */
  logout(): void {
    this.router.navigate(['/login']);
    this.user.next(null);
    this.afAuth.signOut();
  }
}
