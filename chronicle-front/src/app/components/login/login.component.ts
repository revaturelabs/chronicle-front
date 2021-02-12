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
    firebase.auth().currentUser?.getIdToken().then(token => console.log(token));
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
}
