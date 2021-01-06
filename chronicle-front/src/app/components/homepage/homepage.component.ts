import { Component, OnInit } from '@angular/core';
import { HelloService } from 'src/app/services/hello.service';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app'
import 'firebase/auth'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public myUser: any = null;
  
  constructor(private helloService : HelloService, public authService: AuthService) { }
  ngOnInit(): void {
    //this.getHello();
    this.getHelloTest();
    
  }
  

 async getHelloTest() {

    console.log("This should be getting called");
    
    let userToken = await this.authService.getSyncToken();
    let uID = await this.authService.getSyncUID();
    let email = await this.authService.getSyncEmail();
    let displayName = await this.authService.getSyncDisplayName();
    let metadata = await this.authService.getSyncMetaData();

    console.log(userToken);
    console.log(uID);
    console.log(email);
    console.log(displayName);
    console.log(metadata);

    this.helloService.getHello(userToken)
    .subscribe(data => {console.log(data), console.log("this also should be getting called")});

  
    }

}
