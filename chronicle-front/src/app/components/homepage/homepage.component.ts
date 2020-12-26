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

  constructor(private helloService : HelloService) { }
  ngOnInit(): void {
    this.getHello();
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
