import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DisplayUser } from '../models/display-user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: BehaviorSubject<DisplayUser[]> = new BehaviorSubject<DisplayUser[]>([]);
  get Users(): BehaviorSubject<DisplayUser[]> {
    this.populateUsers();
    return this.users;
  }

  constructor(private http: HttpClient) { }

  populateUsers() {
    //make api call for users
    this.http.get<DisplayUser[]>(environment.apiBase + environment.serverApiUrls.getFirebaseUsers)
    .subscribe((resp: DisplayUser[]) =>{
        this.users.next(resp);
    })

  }
}
