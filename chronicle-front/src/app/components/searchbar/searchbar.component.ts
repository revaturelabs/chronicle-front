import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
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
  tags: Tag[] = [];
  technologyTags: Tag[] = [];

  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;

  constructor(private mediaRetrievalService: MediaRetrievalService) {}

  ngOnInit(): void {
    this.mediaRetrievalService.getAllTags().subscribe(resp => {
      console.log(resp)
      this.technologyTags = this.mediaRetrievalService.filterTags(resp, 'Technology');
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tagValue: string | null) => tagValue ? this._filter(tagValue) : this.technologyTags.slice()));
      console.log(this.filteredTags)  
    });
  }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   console.log(event);
  //   console.log(input);
  //   console.log(value)

  //   // Add our tag
  //   if ((value || '').trim()) {
  //     this.tags.push(value.trim());
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }

  //   this.tagCtrl.setValue(null);
  // }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    console.log(this.tags)
    if (this.tagInput)
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(tagValue: string): Tag[] {
    if(tagValue) {
      let filterValue = tagValue.toString().toLowerCase();
      return this.technologyTags.filter(tag => tag.value.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return this.technologyTags;
    }
  }
}