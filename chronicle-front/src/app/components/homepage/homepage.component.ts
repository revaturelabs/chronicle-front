import { Component, OnInit } from '@angular/core';
import { HelloService } from 'src/app/services/hello.service';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})



  /**
 * The home page component
 * 
 * */
export class HomepageComponent implements OnInit {
  public myUser: any = null;

  constructor(private helloService: HelloService, public authService: AuthService) { }
  ngOnInit(): void {

  }



  

/**
 * Retrieves a hello string from the backend if endpoints exists on the backend
 * 
 * Contains examples of how to gather user data
 * 
 * */
 async getHelloTest(): Promise<void> {

    console.log('This should be getting called');

    const userToken = await this.authService.getSyncToken();
    const uID = await this.authService.getSyncUID();
    const email = await this.authService.getSyncEmail();
    const displayName = await this.authService.getSyncDisplayName();
    const metadata = await this.authService.getSyncMetaData();

    console.log(userToken);
    console.log(uID);
    console.log(email);
    console.log(displayName);
    console.log(metadata);

    this.helloService.getHello(userToken)
    .subscribe(data => {console.log(data), console.log('this also should be getting called'); });


    }

}
