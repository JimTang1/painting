import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents:Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  private databaseUrl = "http://localhost:3000/documents/";

  constructor(private http:HttpClient) {  } 
  
  storeDocuments(){
    let documentStr = JSON.stringify(this.documents);
    const headers = new HttpHeaders({"Content-Type": "application/json"});

    this.http.put(this.databaseUrl, documentStr,{headers: headers})
    .subscribe(()=>{
      this.sortAndSend();
    })
  }

  sortAndSend(){
    this.documents = this.documents.sort(
      (a,b)=>a.name.toLowerCase()>b.name.toLowerCase()?1:
      b.name.toLowerCase()>a.name.toLowerCase()?-1:0);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocument(id: string): Document{
    for(let document of this.documents){
      if(document.id === id){
        return document;
      }
    }
  }

  getDocuments(){
    this.http.get<{ message: String, documents: Document[]}>(this.databaseUrl)
    .subscribe((res: any) => {
      // Get documents from database
      this.documents = res.documents;
      // Sort & Emit the document list
      this.sortAndSend();
    },(error)=>{
          console.log("Document Error " + error);
        }
      )
  }

  
  addDocument(newDocument: Document){
    if(!newDocument){
      return;
    }
    newDocument.id = "";
    // setting headers for the http post
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

     // add to database
    this.http.post<{ message: string, document: Document }>(this.databaseUrl, newDocument, { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      }
    );
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(!originalDocument ||!newDocument){
        return;
      }

      const pos = this.documents.indexOf(originalDocument);
      if(pos < 0){
        return;
      }

      newDocument.id = originalDocument.id;
      // Setting header
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put(this.databaseUrl + originalDocument.id, newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      }
    );

      this.documents[pos] = newDocument;
      this.sortAndSend();
    }

  deleteDocument(document:Document){
    if(!document){
      return;
    }

    const pos = this.documents.indexOf(document);
    if(pos < 0){
      return;
    }

    // delete from database
    this.http.delete(this.databaseUrl + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}