import { Injectable } from '@angular/core';
import { Tag } from '../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagColorService {

  constructor() { }

  public getColorStringFromTag(tag : Tag) : any {


    if (tag.name == "Technology")
    return {
      "background-color": '#1B93F3',
      "color": "white"
    }
    else if (tag.name == "Date") {
      return {
      "background-color": '#22243F',
      "color": "white"
      }
    } else
    return {
      "background-color": "#3A3E44",
      "color" : "white"
    }
  }


}
