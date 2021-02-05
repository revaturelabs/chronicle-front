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
    this.helloService.getHello()
    .subscribe(data => {console.log(data), console.log('this also should be getting called'); });

    }

}
