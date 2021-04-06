import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contacts } from './contacts.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers:[ContactService]
})
export class ContactsComponent implements OnInit {
  selectedContact: Contacts;
  
  constructor(private contactService : ContactService) { }

  ngOnInit(): void {
    this.contactService.contactSelectedEvent
    .subscribe(
      (contact: Contacts) =>{
        this.selectedContact = contact;
      }
    );
  }

}
