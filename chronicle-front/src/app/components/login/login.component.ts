import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app'
import 'firebase/auth'
import { Router } from '@angular/router';
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
  public isSignedIn:boolean;

  constructor( private router: Router) {
    this.isSignedIn = false;
   }  

  ngOnInit(): void {
    
  }

  successCallback() {
    console.log('LoginComponent:: emailPasswordLogin:: successful login');
    this.isSignedIn = true;
    console.log(firebase.auth().currentUser?.email);
    console.log(firebase.auth().currentUser?.displayName);
    console.log(firebase.auth().currentUser?.uid);
    console.log(firebase.auth().currentUser?.emailVerified); 
    firebase.auth().currentUser?.getIdToken().then(token => console.log(token));
  }

  errorCallback() {
    console.log('LoginComponent:: emailPasswordLogin:: login failed:');
  }   

  logout(){     
    firebase.auth().signOut().then(function() {
      console.log("User logged out");
      console.log(firebase.auth().currentUser?.email);
      console.log(firebase.auth().currentUser?.displayName);
      console.log(firebase.auth().currentUser?.uid);
      console.log(firebase.auth().currentUser?.emailVerified); 
    }).catch(function(error) {
      // An error happened.
    });
    this.isSignedIn = false; 
  }
                
  /*
  constructor(private afAuth: AngularFireAuth) {

    
  } 

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    
    //console.log("I signed in" + signInSuccessData.authResult.user?.getIdToken(true).then(function(idToken) {
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

    
    */
}
