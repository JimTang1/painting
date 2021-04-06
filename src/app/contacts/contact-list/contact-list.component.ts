import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contacts} from '../contacts.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  //@Output() selectedContactEvent = new EventEmitter<Contacts>();
  contacts:Contacts[] = [];
  contact:Contacts;
  private contactChangeSub;
  term: string;
  subscription: Subscription;


  constructor(private contactService: ContactService) { }

    ngOnInit(): void {
    //this.contacts = this.contactService.getContacts();
      this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contacts[])=>{
        this.contacts = contacts;
      });
      this.contactService.getContacts();
  }

  ngOnDestroy(){
    this.contactChangeSub.unsubscribe();
  }

  search(value: string){
    this.term = value;
    console.log(this.term);
  }
}
