import { DisplayUser } from './../../models/display-user';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';

/**
 * @title Mult-select whitelist auto-complete
 */

@Component({
  selector: 'app-whitelist-select',
  templateUrl: './whitelist-select.component.html',
  styleUrls: ['./whitelist-select.component.css']
})
export class WhitelistSelectComponent implements OnInit {
  @Output() whitelist: EventEmitter<DisplayUser[]> = new EventEmitter<DisplayUser[]>();
  userControl = new FormControl();
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  users: DisplayUser[] = [];
  @Input() currentWhitelist: any;
  selectedUsers: DisplayUser[] = [];
  filteredUsers!:Observable<DisplayUser[]>;
  lastFilter: string = '';
  uploadingUserId : string | null | undefined;

  constructor(private userService: UsersService, private auth: AuthService) { }

  /**
  * Retrieving all the users from our db.
  * Utilizes our filter function to autocomplete the email we are looking for.
  * Also, splices out the current user from the users array, so that they are unable remove themselves from the selected list if they want to make their media private.
  */
  ngOnInit() {
    this.auth.User.subscribe(resp =>{

      if(!resp)
        return;

      if(!this.currentWhitelist){
        this.uploadingUserId = resp.email;
        this.toggleSelection(resp);
      }

    })

    this.userService.Users.pipe(take(2)).subscribe((resp: any[]) =>{
      // sommething is likely seriously wrong if true though
      if (this.uploadingUserId === undefined) {
        return;
      }

      this.users = resp;
      if(!this.currentWhitelist && this.uploadingUserId !== undefined){
        const i = this.users.findIndex(value => value.email! === this.uploadingUserId)
        this.users.splice(i, 1);
      }
      this.filteredUsers = this.userControl.valueChanges.pipe(
        startWith<string | any[]>(''),
        map(value => typeof value === 'string' ? value : this.lastFilter),
        map(filter => this.filter(filter)),

      );
      if(resp.length > 0)
      this.selectCurrentWhitelist();
    })
  }

  /**
   * A method that allows us to iterate over the whitelist array and calls the toggleSelection method to mark or unmark the checkbox.
   */
  private selectCurrentWhitelist() {
    if(this.currentWhitelist)
      for (let user of this.currentWhitelist) {
        const index = this.users.findIndex(value => value.uid! === user);
        if(this.users[index])
          this.toggleSelection(this.users[index]);
      }
  }

   /**
    * This is our main filter method. It will filter out emails based on our input, and return the results.
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
    * The click event is mapped to optionClicked() which toggles the checkboxes.
    * @param event, this is to prevent the drop down from going away after checking a user.
    * @param user, the selected user.
    */
  optionClicked(event: Event, user: any) {
    event.stopPropagation();
    this.toggleSelection(user);
  }


   /**
    * Allows us to push the selected emails into the selectedUsers array.
    * Emits the array to the upload component.
    * @param user, the selected user.
    */
  toggleSelection(user: any) {
    // refuse to ever *un*check the uploading user
    if (user.selected && user.email == this.uploadingUserId) {
      return;
    }

    user.selected! = !user.selected;
    if (user.selected) {
      console.log(user.selected);
      this.selectedUsers.push(user);
    } else {
      const i = this.selectedUsers.findIndex(value => value.email === user.email);
      this.selectedUsers.splice(i, 1);
    }
    this.userControl.setValue(this.selectedUsers);
    console.log(this.selectedUsers);
    this.whitelist.emit(this.selectedUsers);
  }

}

