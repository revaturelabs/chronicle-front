import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app'
import 'firebase/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router) { }  

  ngOnInit(): void {
    
  }

  successCallback() {
    console.log('LoginComponent:: emailPasswordLogin:: successful login');
    console.log(firebase.auth().currentUser?.email);
    console.log(firebase.auth().currentUser?.displayName);
    console.log(firebase.auth().currentUser?.uid);
    console.log(firebase.auth().currentUser?.emailVerified); 
  }

  errorCallback() {
    console.log('LoginComponent:: emailPasswordLogin:: login failed:');
  }   

  logout(){     
    firebase.auth().signOut();
    console.log("User logged out");
    console.log(firebase.auth().currentUser?.email);
    console.log(firebase.auth().currentUser?.displayName);
    console.log(firebase.auth().currentUser?.uid);
    console.log(firebase.auth().currentUser?.emailVerified); 
  }
}
