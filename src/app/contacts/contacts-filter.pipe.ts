import { Pipe, PipeTransform } from '@angular/core';
import { Contacts } from './contacts.model';
@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts:Contacts[], term:string){
    let filteredContacts:Contacts[]=[];
    if(term && term.length > 0){
      filteredContacts = contacts.filter(
        (contact:Contacts) =>{
          return contact.name
                  .toLowerCase()
                  .includes(term.toLowerCase())
        }
      );
    }
    if(filteredContacts.length < 1){
      return contacts;
    }
    return filteredContacts;
  }
}
