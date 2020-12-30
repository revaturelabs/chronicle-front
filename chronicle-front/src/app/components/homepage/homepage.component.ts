import { Component, OnInit } from '@angular/core';
import { HelloService } from 'src/app/services/hello.service';
import firebase from 'firebase/app'
import 'firebase/auth'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public myUser: any = null;
  
  constructor(private helloService : HelloService) { }
  ngOnInit(): void {
    //this.getHello();
    
    firebase.auth().onAuthStateChanged(user=>{
      if(user){

        this.myUser = user;

        user.getIdToken().then(token=>{
          console.log("getIdToken " + token)
          this.helloService.getHello(token)
            .subscribe(data => {
              console.log(data);
              console.log("this also should be getting called");
              alert(data);
            });
        })
      }
      else{
        console.log("oh no!!!!!!!!!!!")
      }
    })
  }
  

  
  
  getHello() {

    console.log("This should be getting called");
    
       firebase.auth().currentUser?.getIdToken().then(token=>{
        console.log("getIdToken " + token)
        this.helloService.getHello(token)
          .subscribe(data => {
            console.log(data);
            console.log("this also should be getting called");
            alert(data);
          });
      }); 
      //this.helloService.getHello().subscribe()
      /*
      //console.log("homepage getHello jwt: "+jwt);
      this.helloService.getHello(jwt)
      .subscribe(data => {
        console.log(data);
        console.log("this also should be getting called");
        alert(data);
      });
      */
    
  }
}
