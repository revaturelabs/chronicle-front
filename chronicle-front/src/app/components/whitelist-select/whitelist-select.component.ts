import { UsersService } from './../../services/users.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

/**
 * @title Mult-select whitelist auto-complete
 */

@Component({
  selector: 'app-whitelist-select',
  templateUrl: './whitelist-select.component.html',
  styleUrls: ['./whitelist-select.component.css']
})
export class WhitelistSelectComponent implements OnInit {
  @Output() whitelist: EventEmitter<string[]> = new EventEmitter<string[]>();
  userControl = new FormControl();
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  users: any = [];
  selectedUsers: any[] = new Array<any>();
  filteredUsers!:Observable<any[]>;
  lastFilter: string = '';

 
  constructor(private userService: UsersService) { }
  
  /**
  * Retrieving all the users from our db. 
  * Also, utilizing our filter function to autocomplete the email we are looking for.
  */
  ngOnInit() {
    this.userService.Users.subscribe((resp: any[]) =>{
      this.users = resp; 
      this.filteredUsers = this.userControl.valueChanges.pipe(
        startWith<string | any[]>(''),
        map(value => typeof value === 'string' ? value : this.lastFilter),
        map(filter => this.filter(filter))
      );
    })
  }

   /**
    * This is our main filter function. It will filter out emails based on our input, and return the results. 
    * @param filter, the input text of the user.  
    */
  filter(filter: string): any[] {
    this.lastFilter = filter;
    if (filter) {
      return this.users.filter((option: { email: string }) => {
        return option.email.toLowerCase().indexOf(filter.toLowerCase()) >= 0
      })
    } else {
      return this.users.slice();
    }
  }

   /**
    * Toggles the checkboxes. 
    * @param event 
    * @param user 
    */
  optionClicked(event: Event, user: any) {
    event.stopPropagation();
    this.toggleSelection(user);
  }

  /**
   * Allows us to push the selected emails into the selectedUsers array.
   * Emits the array to the upload component. 
   */
  toggleSelection(user: any) {
    user.selected! = !user.selected;
    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      const i = this.selectedUsers.findIndex(value => value.email === user.email);
      this.selectedUsers.splice(i, 1);
    }
    this.userControl.setValue(this.selectedUsers);
    this.whitelist.emit(this.selectedUsers);  
  }

}

