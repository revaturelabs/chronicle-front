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
