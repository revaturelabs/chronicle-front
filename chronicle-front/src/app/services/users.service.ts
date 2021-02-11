import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  dummyData = [
    {
      uID: 'lkajioenflkjsodijfoje',
      displayName: 'Dylan Mahaffey',
      email: 'dylan.mahaffey@gmail.com', 
      selected: false, 
    },
    {
      uID: 'ffdsuiyueuhejhuihusiu',
      displayName: 'Alec Sherlock',
      email: 'alec@gmail.com', 
      selected: false 
    },
    {
      uID: 'ueue87uhcviuhviuhiuaad',
      displayName: 'George Yoo',
      email: 'geo@gmail.com', 
      selected: false
    },
  ]

  private users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  get Users(): BehaviorSubject<any[]> {
    this.populateUsers();
    return this.users;
  }

  constructor(private http: HttpClient) { }

  populateUsers() {
    //make api call for users
    this.http.get(environment.apiBase + environment.serverApiUrls.getFirebaseUsers)
    .subscribe(resp =>{ 
        this.users.next(resp);
    })

  }
}
