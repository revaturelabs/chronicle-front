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

  ngOnInit() {
    this.userService.Users.subscribe(resp =>{
      this.users = resp; 
    })
    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith<string | any[]>(''),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      map(filter => this.filter(filter))
    );
  }

  filter(filter: string): any[] {
    this.lastFilter = filter;
    if (filter) {
      return this.users.filter((option: { displayName: string }) => {
        return option.displayName.toLowerCase().indexOf(filter.toLowerCase()) >= 0
      })
    } else {
      return this.users.slice();
    }
  }

  optionClicked(event: Event, user: any) {
    event.stopPropagation();
    this.toggleSelection(user);
  }

  toggleSelection(user: any) {
    user.selected! = !user.selected;
    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      const i = this.selectedUsers.findIndex(value => value.displayName === user.displayName);
      this.selectedUsers.splice(i, 1);
    }
    this.userControl.setValue(this.selectedUsers);
    this.whitelist.emit(this.selectedUsers);  
  }

}

