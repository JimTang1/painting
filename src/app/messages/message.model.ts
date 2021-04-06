import { Contacts } from 'src/app/contacts/contacts.model';
export class Message{
    constructor(
        public id: string,
        public subject: string,
        public msgText: string,
        public sender: Contacts
    ){}
}
