import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contacts } from '../contacts.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact:Contacts;
  originalContact: Contacts;
  groupContacts: Contacts[] = [];
  editMode: boolean = false;
  id: string;

  constructor(private route:ActivatedRoute,
    private router: Router,
    private contactServic: ContactService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params)=>{
      this.id = params['id'];
      if(!this.id){
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactServic.getContact(this.id);
      if(!this.originalContact){
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if(this.originalContact.group && this.originalContact.group.length>0){
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }

    })
  }

  onCancel(){
    this.router.navigate(['..'], {relativeTo:this.route});
  }

  onRemoveItem(index: number){
    if(index<0 || index >= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  addToGroup($event: any){
    const selectedContact:Contacts = $event.dragData;
    const invalidGropContact = this.isInvalidContact(selectedContact);

    if(invalidGropContact){
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onSubmit(form:NgForm){
    const value = form.value;
    const newContact = new Contacts(
      '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if(this.editMode){
      this.contactServic.updateContact(this.originalContact, newContact);
    }else{
      this.contactServic.addContact(newContact);
    }
    this.router.navigate(['..'], {relativeTo:this.route});
  }

  isInvalidContact(newContact:Contacts){
    if(!newContact){
      return true;
    }
    if(this.contact && newContact.id === this.contact.id){
      return true;
    }

    for(let i = 0; i < this.groupContacts.length;i++){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }
}
