import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/Note';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';
import { MediaTransferService } from 'src/app/services/media-transfer.service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'app-viewnotepage',
  templateUrl: './viewnotepage.component.html',
  styleUrls: ['./viewnotepage.component.css']
})
export class ViewnotepageComponent implements OnInit {

  // url: string = 'http://www.africau.edu/images/default/sample.pdf'
  url: string = 'https://www.w3.org/TR/PNG/iso_8859-1.txt'

  @Input()
  note?: Note;
  
  public errorMsg? : String = undefined;

  constructor(private transfer : MediaTransferService, private mediaService : MediaRetrievalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.transfer.note) {
      this.note = this.transfer.note;
      this.transfer.note = undefined;
    } else {
      let id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      if (id == null) {
        this.errorMsg = "Note Not Found";
        console.log("Note url not valid");

      } else {

        let idInt = parseInt(id, 10);

        this.mediaService.getNoteById(idInt).subscribe(resp => {
          this.note = resp;
        });
      }
    }
  }

}
