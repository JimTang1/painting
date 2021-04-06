import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit, OnDestroy{
  documents:Document[] =[];
  private documentChangeSub;
  subscription: Subscription;

  constructor(private documentService: DocumentService,
    router: Router,
    route: ActivatedRoute) { }

    ngOnInit():void{
      this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) =>{
          this.documents = documents;
        }
      );
        this.documentService.getDocuments();
    }

  ngOnDestroy(){
    this.documentChangeSub.unsubscribe();
  }
}
