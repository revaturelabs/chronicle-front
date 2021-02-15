import { Component, Input, OnInit } from '@angular/core';
import { UpdateWhitelistService } from 'src/app/services/update-whitelist.service';

/**
 * Created this component so that admins are able to edit the privacy settings on media.
 * This component is placed within the viewnotepage.html and viewvideopage.html
 */
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

  /**
   * This method is binded to a click event on the components Upload button.
   * When clicked it will call our updateWhitelist service to send the updated white list to our backend.
   */

  update(): void {
    let userIdWhitelist = [];
    for(let user of this.userWhitelist) {
      userIdWhitelist.push(user.uid);
    }
    this.updateWhitellist.update(userIdWhitelist, this.media.id, 'notes')
  }

  /**
   * Takes in the whitelist of the media from the emitted output from whitelist-select component.
   * @param idList
   */
  setUserList(idList: any) {
    this.userWhitelist = idList;
  }

}
