import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contacts } from 'src/app/contacts/contacts.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild("subject") subject: ElementRef;
  @ViewChild("msgText") msgText: ElementRef;

  currentSender: Contacts;
  constructor(private messageService:MessageService,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContactAPI('101')
    .subscribe((res: any)=>{
      this.currentSender = res.contact;
    })

  }

  onSendMessage(){
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    const message = new Message(
      '1',
      subjectValue,
      msgTextValue,
      this.currentSender
    );

    this.messageService.addMessage(message)
    this.onClear();
  }

  onClear(){
    this.subject.nativeElement.value= "";
    this.msgText.nativeElement.value = "";
  }
}
