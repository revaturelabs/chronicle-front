import { Component, OnInit } from '@angular/core';
// import * as firebaseui from 'firebaseui';
// import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';


// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) {

    this.afAuth.currentUser
  } 

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    
    console.log("I signed in" + signInSuccessData.authResult.user?.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS

      console.log(idToken);
      // ...
    }).catch(function(error) {
      // Handle error
    }));



  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log("I am a failure" + errorData);


  }
  uiShownCallback() {
     console.log("on loading of login ui");
  }

  ngOnInit(): void {


  }

  logout(){
    this.afAuth.signOut();
    console.log("you logged out");

  }


}
