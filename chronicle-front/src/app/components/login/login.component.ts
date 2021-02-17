import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


  /**
 * The Login Component uses FirebaseUI for logging in
 * Configuration for FirebaseUI can be found in appmodule.ts
 *
 * */
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {

   }

  ngOnInit(): void {}


/**
 * The success callback is invoked on a successful login
 * Calls a login function in the authservice for added functionality post login
 *
 * */

  successCallback(): void {
    let user = firebase.auth().currentUser;

    // currently can not find a suitable way to call an on register method without changing
    // the current code base. I found a way to write an onRegister function but it is on the firebase console.
    // For now we are just checking if the user has any claims set. If not then we know they are a new user
    // Then we call the onRegister
    firebase.auth().currentUser?.getIdTokenResult()
    .then(tokenResults => {
      if(!tokenResults.claims.role && user)
        this.onRegister(user.uid);
    })

    this.authService.login();
  }


/**
 * This function is called on a login error
 * Console logs an error
 *
 * */

  errorCallback(): void {
    console.log('LoginComponent:: emailPasswordLogin:: login failed:');
  }

  /**
   * onRegister
   *    Need a function added to the firebase console that can handle this more elegantly
   *    Makes call to API /firebase/register/{uid} to add ROLE_USER claim
   */
  onRegister(id: string) {
    this.authService.register(id);
  }
}
