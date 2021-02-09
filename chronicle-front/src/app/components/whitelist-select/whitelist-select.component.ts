import { UsersService } from './../../services/users.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-whitelist-select',
  templateUrl: './whitelist-select.component.html',
  styleUrls: ['./whitelist-select.component.css']
})
export class WhitelistSelectComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: any; 

  @Output() selectedUserIDs: EventEmitter<string[]> = new EventEmitter<string[]>();

  users: any[]= []; 
  userTags: any[] =[]; 
  selectedUsers: any[] = []; 

  @ViewChild('userInput') userInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;
  
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.Users.subscribe(resp =>{
      this.users = resp; 
      this.filteredUsers = this.userCtrl.valueChanges.pipe(
        startWith(null),
        map((userValue: string | null) => userValue ? this._filterTag(userValue) : this.users.slice()));
    }); 
    
    
  }

  remove(user: any): void {
    const index = this.selectedUsers.indexOf(user);
    if (index != -1) {
      this.selectedUsers.splice(index, 1);
      if (this.users.indexOf(user) == -1) {
        this.users.push(user);
        // this.filteredUsers = this.users; 
        
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUsers.push(event.option.value);
     // removes a tag from the list if it has already been selected
  
    this.users.splice(this.selectedUsers.indexOf(event.option.value), 1);
    if (this.userInput)
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);

  }


  private _filterTag(userValue: string): any[] {
    console.log("Being hit"); 
    if(userValue) {
      let filterValue = userValue.toString().toLowerCase();
      return this.users.filter(user => user.displayName.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return this.users;
    }
  }


 

}
