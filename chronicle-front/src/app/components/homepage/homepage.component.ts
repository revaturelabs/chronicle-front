import { Component, OnInit } from '@angular/core';
import { HelloService } from 'src/app/services/hello.service';
import firebase from 'firebase/app'
import 'firebase/auth'
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HelloService } from 'src/app/services/hello.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {


  constructor(private helloService : HelloService) { }
  ngOnInit(): void {
    //this.getHello();


  displayName?: any;


  

  token?: any;

  token2?: any;

  actualtoken?: any;

/*

  const App = {
    getLoggedInUser: () => {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        return {
          email: currentUser.email,
          userId: currentUser.uid,
          isEmailVerified: currentUser.emailVerified,
        };
      } else {
        return undefined;
      }
    },
    isAuthenticated: () => {
      return !!(App.getLoggedInUser() && App.getLoggedInUser()!.isEmailVerified === true);
    },
  };
  export default App;

  */





/*
  constructor(private afAuth: AngularFireAuth, private helloService: HelloService) { }


  ahhh() {

    console.log(this.afAuth.idToken.subscribe(data => {(this.token = data), () => this.getHello()}, error => {console.log(error)}, () => this.getHello()));
    console.log(this.afAuth.user.subscribe((data => {console.log(data?.displayName)})));


    console.log(this.afAuth.idToken.subscribe(data => {console.log(data)}));
    //customer_id => {this.customer_id = customer_id.body.customer_id}, error => {console.log(error)}, () => this.submitOrderData(this.customer_id))
    // console.log(this.afAuth.currentUser.then(data => this.displayName = data?.displayName?.toString));
    // console.log(this.afAuth.currentUser.then(data => console.log(data?.email)));
    // console.log(this.afAuth.currentUser);
      

    //console.log(this.afAuth.idToken.toPromise().then(data => {console.log(data)}))

    //this.afAuth.idToken.toPromise().then(data => {this.token2 = data});

    //this.afAuth.idToken.pipe()


  }


  setToken(data: any) {

    this.token = data;

  }

*/
  getHello() {

    console.log("This should be getting called");

    

    this.helloService.getHello(this.token)
    .subscribe(data => {console.log(data), console.log("this also should be getting called")});



  }



  }

  getHello() {

    console.log("This should be getting called");    

    this.helloService.getHello(firebase.auth().currentUser?.displayName)
    .subscribe(data => {
      console.log(data);
      console.log("this also should be getting called");
      alert(data);
    });
}
}
