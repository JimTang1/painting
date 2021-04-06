import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';
import {Document} from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document:Document;
  id:string;
  nativeWindow: any;

  constructor(private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router,
    private windowRefService: WinRefService) { 
      this.nativeWindow = windowRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) =>{
      this.id = params['id'];
      this.document = this.documentService.getDocument(this.id);
    })
  }

  onEditDocument(){
    this.router.navigate(['Edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onView(){
    if(this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
  }
}
