import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contacts } from './contacts.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ContactService {
  private contacts : Contacts[];
  contactSelectedEvent = new EventEmitter<Contacts>();
  contactListChangedEvent = new Subject<Contacts[]>();
  private databaseUrl = "http://localhost:3000/contacts/";


  constructor(private http:HttpClient) {}

  storeContacts(){
    let contactStr = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({"Content-Type":"application/json"});

    this.http.put(this.databaseUrl, contactStr, {headers: headers})
      .subscribe(()=>{
        this.sortAndSend();
      })
    }

  sortAndSend(){
    this.contacts = this.contacts.sort(
     (a,b)=>a.name.toLowerCase()>b.name.toLowerCase()?1:
      b.name.toLowerCase()>a.name.toLowerCase()? -1:0)

    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContact(id:string): Contacts{
    for(let contact of this.contacts){
      if(contact.id === id){
        return contact;
      }
    }
    return null;
  }

  getContacts(){
    this.http.get<{message: String, contacts: Contacts[]}>(this.databaseUrl)
    .subscribe((res: any)=>{
      this.contacts = res.contacts;
      this.sortAndSend();
    },(error)=>{
      console.log("Contact Error: " + error);
    })
  }

  // Return a single contact by id and through database
  getContactAPI(id: string) {
    return this.http.get<{message: String, contact: Contacts}>(this.databaseUrl + id);
  }


  addContact(newContact: Contacts){
    if (!newContact)
      return;

    // Removing id if it exists (db sets this)
    newContact.id = '';

    // setting headers for the http post
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contacts }>(this.databaseUrl, newContact, { headers: headers }).subscribe(
      (responseData) => {
        // add new contact to contacts
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      }
    );
  }

  updateContact(originalContact: Contacts, newContact: Contacts){
    if(!originalContact||!newContact){
        return;
      }

      const pos = this.contacts.indexOf(originalContact);
      if(pos < 0){
        return;
      }

      newContact.id = originalContact.id;

      // Setting header
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      // update database
      this.http.put(this.databaseUrl + originalContact.id, newContact, { headers: headers })
      .subscribe(
      (response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      }
    );
  }

  deleteContact(contacts:Contacts){
    if(!contacts){
      return;
    }

    const pos = this.contacts.indexOf(contacts);
    if(pos < 0){
      return;
    }

     // delete from database
     this.http.delete(this.databaseUrl + contacts.id).subscribe(
      (response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      }
    );
  }
}
