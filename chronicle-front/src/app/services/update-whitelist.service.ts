import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DisplayUser } from '../models/display-user';

@Injectable({
  providedIn: 'root'
})
export class UpdateWhitelistService {

  constructor(private httpClient: HttpClient) { }

  update(whitelist: any, mediaId: number, mediaType: string ): void{
    this.httpClient.put(`${environment.apiBase}/${mediaType}/whitelist/${mediaId}`, whitelist)
    .subscribe(resp => console.log(resp))
  }

}

