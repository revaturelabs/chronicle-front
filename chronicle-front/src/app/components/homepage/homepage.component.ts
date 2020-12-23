import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  displayName?: any;



  constructor(private afAuth: AngularFireAuth) { }


  ahhh() {

    console.log(this.afAuth.idToken.subscribe((data => {console.log(data)})));
    console.log(this.afAuth.user.subscribe((data => {console.log(data?.displayName)})));


    // console.log(this.afAuth.currentUser.then(data => this.displayName = data?.displayName?.toString));
    // console.log(this.afAuth.currentUser.then(data => console.log(data?.email)));
    // console.log(this.afAuth.currentUser);
      
    

  }

  ngOnInit(): void {

    this.ahhh();


  }

}
