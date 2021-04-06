import { Contacts } from 'src/app/contacts/contacts.model';
import { Customers } from 'src/app/contacts/customers.model';


export class Message{
    constructor(
        public id: string,
        public subject: string,
        public msgText: string,
        public sender: Customers
    ){}
}
