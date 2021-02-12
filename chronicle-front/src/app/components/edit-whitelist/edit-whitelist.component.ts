import { Component, Input, OnInit } from '@angular/core';
import { UpdateWhitelistService } from 'src/app/services/update-whitelist.service';

@Component({
  selector: 'app-edit-whitelist',
  templateUrl: './edit-whitelist.component.html',
  styleUrls: ['./edit-whitelist.component.css']
})
export class EditWhitelistComponent implements OnInit {

  @Input() media: any;
  userWhitelist: any;

  constructor(private updateWhitellist: UpdateWhitelistService) { }

  ngOnInit(): void {
    // this.userWhitelist=this.media.whitelist;
  }

  update(): void {
    for(let user of this.userWhitelist) {
      delete user.selected;
    }
    this.updateWhitellist.update(this.userWhitelist, this.media.id, 'notes');
  }

  setUserList(idList: any) {
    this.userWhitelist = idList;
  }



}
