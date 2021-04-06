import { Message } from './message.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private messages : Message[] =[];
  messageListChangedEvent = new Subject<Message[]>();
  private databaseUrl = "http://localhost:3000/messages/";

  constructor(private http: HttpClient) {}

   getMessage(id:string): Message{
     for(let message of this.messages){
       if(message.id === id){
          return message;
       }
     }
   }

   getMessages() {
    this.http.get<{ message: String, messages: Message[]}>(this.databaseUrl)
    .subscribe((res: any) => {
      // Get messages from database
      this.messages = res.messages;
      // Emit the message list
      this.messageListChangedEvent.next(this.messages.slice());
    },
    (error) => {
      console.log( this.messages);
      console.log("Get Messages Error: " + error);
    });
  }

  addMessage(message: Message) {
    // Ensuring the message exists
    if (!message)
      return;

    // Removing id if it exists (db sets this)
    message.id = '';

    // setting headers for the http post
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, msg: Message }>(this.databaseUrl, message, { headers: headers })
    .subscribe((responseData) => {
        // setting message id
        message.id = responseData.msg.id;
        // add new message to messages
        this.messages.push(message);
        this.messageListChangedEvent.next(this.messages.slice());
      }
    );
  }
}
