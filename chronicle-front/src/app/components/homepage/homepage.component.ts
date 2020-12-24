import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HelloService } from 'src/app/services/hello.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {


  displayName?: any;

  token?: any;


  constructor(private afAuth: AngularFireAuth, private helloService: HelloService) { }


  ahhh() {

    console.log(this.afAuth.idToken.subscribe(data => {console.log(data)}, error => {console.log(error)}, () => this.getHello()));
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
    this.helloService.getHello(this.token)
    .subscribe(data => {console.log(data)});



  }


  ngOnInit(): void {

    this.ahhh();


  }

}
