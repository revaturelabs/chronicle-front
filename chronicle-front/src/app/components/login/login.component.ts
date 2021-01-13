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
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {

   }

  ngOnInit(): void {}
   // If login is successful, a token is generated
  successCallback(): void {
    console.log('LoginComponent:: emailPasswordLogin:: successful login');
    console.log(firebase.auth().currentUser?.email);
    console.log(firebase.auth().currentUser?.displayName);
    console.log(firebase.auth().currentUser?.uid);
    console.log(firebase.auth().currentUser?.emailVerified);
    firebase.auth().currentUser?.getIdToken().then(token => console.log(token));
    this.authService.login();
  }
  // logging an error if login fails
  errorCallback(): void {
    console.log('LoginComponent:: emailPasswordLogin:: login failed:');
  }
}
