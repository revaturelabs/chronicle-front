import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { OnInit } from '@angular/core';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';
import { Tag } from 'src/app/models/Tag';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-searchbar',
  templateUrl: 'searchbar.component.html',
  styleUrls: ['searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: any;

  @Input()
  tags: Tag[] = this.mediaRetrievalService.selectedTags;

  topicTags: Tag[] = [];


  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;

  constructor(private mediaRetrievalService: MediaRetrievalService) {}

  ngOnInit(): void {
    //Retrieves all tags from the db
    this.mediaRetrievalService.getAllTags().subscribe(resp => {
      // Filters tags to be only ones with a key of "topic"
      this.topicTags = resp.filter(tag => tag.type == 'Topic');


      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tagValue: string | null) => tagValue ? this._filterTag(tagValue) : this.topicTags.slice()));
    });

  }

    //Allows a user to remove a selected tag
  remove(tag: Tag): void {
    const index = this.mediaRetrievalService.selectedTags.indexOf(tag);
    if (index != -1) {
      this.mediaRetrievalService.selectedTags.splice(index, 1);
      if (this.topicTags.indexOf(tag) == -1) {

        this.topicTags.push(tag);
      }
    }
  }
  // Adds selected tags to the search bar in the form of 'chips'
  selected(event: MatAutocompleteSelectedEvent): void {

    this.mediaRetrievalService.selectedTags.push(event.option.value);
     // removes a tag from the list if it has already been selected
    this.topicTags.splice(this.topicTags.indexOf(event.option.value), 1);

    if (this.tagInput)
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  //filters typed text to match with a tag from the list of tags
  private _filterTag(tagValue: string): Tag[] {


    if(tagValue) {
      let filterValue = tagValue.toString().toLowerCase();
      return this.topicTags.filter(tag => tag.value.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return this.topicTags;
    }
  }


}
