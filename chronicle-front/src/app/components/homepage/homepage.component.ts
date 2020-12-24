import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HelloService } from 'src/app/services/hello.service';
//import 'firebase/auth';
//import './Init';
//import firebase from 'firebase/app';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {


  displayName?: any;

  token?: any;

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






  constructor(private afAuth: AngularFireAuth, private helloService: HelloService) { }


  ahhh() {

    console.log(this.afAuth.idToken.subscribe(data => {console.log(data), () => this.getHello()}, error => {console.log(error)}, () => this.getHello()));
    console.log(this.afAuth.user.subscribe((data => {console.log(data?.displayName)})));

    //customer_id => {this.customer_id = customer_id.body.customer_id}, error => {console.log(error)}, () => this.submitOrderData(this.customer_id))
    // console.log(this.afAuth.currentUser.then(data => this.displayName = data?.displayName?.toString));
    // console.log(this.afAuth.currentUser.then(data => console.log(data?.email)));
    // console.log(this.afAuth.currentUser);
      
    

  }


  setToken(data: any) {

    this.token = data;

  }


  getHello() {

    console.log("This should be getting called");

    this.helloService.getHello("eyJhbGciOiJSUzI1NiIsImtpZCI6IjNjYmM4ZjIyMDJmNjZkMWIxZTEwMTY1OTFhZTIxNTZiZTM5NWM2ZDciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSnVzdGluIEtyb2giLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzdC1hMGJmMSIsImF1ZCI6InRlc3QtYTBiZjEiLCJhdXRoX3RpbWUiOjE2MDg4MjE3MzIsInVzZXJfaWQiOiJzdUVyVzZTd3BST0phajB5b0YxWGxvS2JWTTAyIiwic3ViIjoic3VFclc2U3dwUk9KYWoweW9GMVhsb0tiVk0wMiIsImlhdCI6MTYwODgyMTczMiwiZXhwIjoxNjA4ODI1MzMyLCJlbWFpbCI6Imp1c3Rpbmtyb2gyMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsianVzdGlua3JvaDIyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.qLOxsqLMkd1ugDWSYHrh2LEgSi779SFeY9UCRf9FGBBpV7bvQYp1WeJSr2MJPWWX5OVXFIDDZogQm4NHhEa_yrcw-8XTt37e9r6eDJh9iPdMrTtLMgTpT12Acp3YSso5Duc96qR9kjkd9XbiWcr9XKQn1pAddM2lcIiRIu_d9DVcTfg1tZERpAQpR2_GTIGgVUF0xOtzXOsYIwZbldu70Pg45eM5367KnNb6xQXcJk7eYTL8WFQn19Y2i1BsgS2Qv4Fgr4iuaIQJ_JVf1vwOJnzQK6MVHzWsLjWGIQe7hZlRCstiuQ4mJpVFr0A8nc-98aCXosviGVHULJJRkeEoIw")
    .subscribe(data => {console.log(data), console.log("this also should be getting called")});



  }


  ngOnInit(): void {

    this.ahhh();
    this.getHello();


  }

}
