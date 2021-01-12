import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chronicle-front';


  constructor(public authService: AuthService, public afAuth: AngularFireAuth) { }




/**
 * This sets user variables in the auth service,
 * It is good to use to check ifLoggedIn or other asynchronous needs,
 * Do not use these user variables in ngOnInit Functions or they will not work on page reload.
 * 
 * @author Justin Kroh, **ADD YOUR NAMES**
 * */
ngOnInit(): void {


    this.afAuth.onAuthStateChanged(user => {

      if (user) {

          this.authService.getSyncDisplayName().then(result => this.authService.displayName = result);
          this.authService.getSyncEmail().then(result => this.authService.email = result);
          this.authService.getSyncUID().then(result => this.authService.uID = result);


      }

    });

  }
}
