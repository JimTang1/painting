import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';
import { ContactService } from '../contact.service';
import { Contacts} from '../contacts.model';
import { Message } from '../../messages/message.model';
import { MessageService } from '../../messages/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contacts;
  id:string;
  nativeWindow: any;
  messages: Message[]=[];
  messageSender :string;
  subscription : Subscription;

  constructor( private route:ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private windowRefService: WinRefService,
    private messageService : MessageService) {
      this.nativeWindow = windowRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) =>{
      this.id = params['id'];
      this.contact= this.contactService.getContact(this.id);
    })

    this.subscription = this.messageService.messageListChangedEvent
    .subscribe((message : Message[]) =>{
        console.log('my messages!!!!!!!!!!')
        console.log(message)
        this.messages = message;
      });


      this.messageService.getMessages();
  }

  onEditContact(){
    this.router.navigate(['Edit'],{relativeTo: this.route});
  }

    onDelete(){
      this.contactService.deleteContact(this.contact);
    }
}
