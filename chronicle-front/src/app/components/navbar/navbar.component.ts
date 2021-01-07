import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app'
import 'firebase/auth'
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {environment}                            from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;     
  
  constructor(private authService: AuthService) {       
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout(){     
    firebase.auth().signOut().then(function() {
      console.log("User logged out");
      console.log(firebase.auth().currentUser?.email);
      console.log(firebase.auth().currentUser?.displayName);
      console.log(firebase.auth().currentUser?.uid);
      console.log(firebase.auth().currentUser?.emailVerified); 
    }).catch(function(error) {
      // An error happened.
    });
    this.authService.logout();      
  }
}
