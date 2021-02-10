import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

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

  private users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // selectedUsers: any[] = []; 

  get Users(): BehaviorSubject<any[]> {
    this.populateUsers();
    return this.users;
  }

  constructor() { }

  populateUsers() {
    //make api call for users
    this.users.next(this.dummyData);
  }
}
