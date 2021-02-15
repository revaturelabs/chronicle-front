import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/Note';
import { MediaRetrievalService } from 'src/app/services/media-retrieval.service';
import { MediaTransferService } from 'src/app/services/media-transfer.service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { Tag } from 'src/app/models/Tag';
import { TagColorService } from 'src/app/services/tag-color.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

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
  topics?: Tag[];
  batch?: string;
  public errorMsg? : String = undefined;
  admin: boolean = false;
  currentUser: any = null;

  constructor(
    private transfer : MediaTransferService,
    private mediaService : MediaRetrievalService,
    private route: ActivatedRoute,
    public colorService : TagColorService,
    private aAuth: AngularFireAuth,
    private userAuth: AuthService
  ) { }

  searchTag(tag : Tag) {
    this.mediaService.searchNoteTag(tag)
  }

  ngOnInit(): void {
    if (this.transfer.note) {
      this.note = this.transfer.note;
      this.transfer.note = undefined;
      this.topics = this.mediaService.filterTags(this.note.tags, 'Topic');
      this.batch = this.mediaService.filterTags(this.note.tags, 'Batch')[0].value;
    } else {
      let id = this.route.snapshot.paramMap.get('id');
      if (id == null) {
        this.errorMsg = "Note Not Found";


      } else {

        let idInt = parseInt(id, 10);

        this.mediaService.getNoteById(idInt).subscribe(resp => {
          this.note = resp;
          this.topics = this.mediaService.filterTags(this.note.tags, 'Topic');
          this.batch = this.mediaService.filterTags(this.note.tags, 'Batch')[0].value;
        });
      }
    }

    this.aAuth.idTokenResult.subscribe(resp => {
        if(resp?.claims.role && resp.claims.role.includes("ROLE_ADMIN")){
          this.admin = true;
        } else {
          this.admin =false;
        }

    })

    this.userAuth.User.subscribe(user => {
      console.log(user);
      this.currentUser = user;
    })


  }


}
