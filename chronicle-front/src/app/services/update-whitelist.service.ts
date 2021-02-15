import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * A Service that handles updating the whitelist on existing media.
 */
@Injectable({
  providedIn: 'root'
})

export class UpdateWhitelistService {
  constructor(private httpClient: HttpClient) {}

  /**
   * This method is called to update the whitelist for a specific media.
   * Utilizing the HttpClient module.
   * @param whitelist, the updated whitelist.
   * @param mediaId, the id of the media we are updating.
   * @param mediaType, the media type.
   */
  update(whitelist: any, mediaId: number, mediaType: string ): void{
    console.log(whitelist);
    this.httpClient.put(`${environment.apiBase}/${mediaType}/whitelist/${mediaId}`, whitelist)
    .subscribe(resp => console.log(resp))
  }

}

