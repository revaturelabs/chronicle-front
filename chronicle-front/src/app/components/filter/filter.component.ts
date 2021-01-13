import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { Tag } from 'src/app/models/Tag';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';
import { TagColorService } from 'src/app/services/tag-color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: any;
  dateTags: Tag[] =[]; 
  default?: Tag;

  @Input()
  tags: Tag[] = this.mediaRetrievalService.selectedBatchTags;

  batchTags: Tag[] = [];

  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;

  constructor(private mediaRetrievalService: MediaRetrievalService) { }

  ngOnInit(): void {
    this.mediaRetrievalService.getAllTags().subscribe(resp => {
      this.batchTags = this.mediaRetrievalService.filterTags(resp, 'Batch');
      this.dateTags = this.mediaRetrievalService.filterTags(resp, 'Date');
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tagValue: string | null) => tagValue ? this._filterTag(tagValue) : this.batchTags.slice()));
    })

  }

  remove(tag: Tag): void {
    // gets the index of the tag to be removed
    const index = this.mediaRetrievalService.selectedBatchTags.indexOf(tag);

    if (index != -1) {
      // removes tag
      this.mediaRetrievalService.selectedBatchTags.splice(index, 1);
      if (this.batchTags.indexOf(tag) == -1) {
        // pushes tab back into the options list
        this.batchTags.push(tag);
      }
    }
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {
    this.mediaRetrievalService.selectedBatchTags.push(event.option.value);
    // removes a tag from the list if it has already been selected
    this.batchTags.splice(this.batchTags.indexOf(event.option.value), 1);
    if (this.tagInput)
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filterTag(tagValue: string): Tag[] {
    if(tagValue) {
      let filterValue = tagValue.toString().toLowerCase();
      return this.batchTags.filter(tag => tag.value.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return this.batchTags;
    }
  }

  getDate(input:any){
    let split = input.target.value.split("-");
    let date = `${split[1]}-${split[2]}-${split[0]}`;
    let finalDate = this.dateTags.forEach(tag => {
      console.log(tag.value); 
      if(tag.value == date){
        this.mediaRetrievalService.date = tag
        console.log(tag);
      }else{
         this.default = {
          tagID: "-1",
          name: "Date",
          value: "1-1-1900"
        };
        this.mediaRetrievalService.date = this.default;
      }
      });
    console.log(this.mediaRetrievalService.date)
  }

}
