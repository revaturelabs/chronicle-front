import { UsersService } from './../../services/users.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-whitelist-select',
  templateUrl: './whitelist-select.component.html',
  styleUrls: ['./whitelist-select.component.css']
})
export class WhitelistSelectComponent implements OnInit {

  @Output() selectedUserIDs: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

}
