import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id:string;
  editMode: boolean = false;
  originalDocument: Document;
  document: Document;
  newDocument: Document;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params)=>{
      this.id = params['id'];
      if(this.id == null || this.id ==undefined){
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(this.id);
      if(this.originalDocument == null || this.originalDocument == undefined){
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));

      // this.editMode = params['id'] != null;

    })
  }

  onSubmit(form:NgForm){
    const value = form.value;
    // this.newDocument = new Document();
    if(this.editMode === true){
      this.documentService.updateDocument(this.originalDocument, value);
    }else{
      this.documentService.addDocument(value);
    }
    this.router.navigate(['..'],{relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['..'],{relativeTo: this.route});
  }
}
