import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})

export class MessageListComponent implements OnInit {
  messages: Message[]=[];
  messageSender :string;
  subscription : Subscription;

  constructor(private messageService : MessageService) { }

  ngOnInit(): void {
    this.subscription = this.messageService.messageListChangedEvent
    .subscribe((message : Message[]) =>{
        this.messages = message;
      });
      this.messageService.getMessages();
  }
}
