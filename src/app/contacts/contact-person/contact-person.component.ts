import { Component, Input, OnInit } from '@angular/core';
import { Contacts } from '../contacts.model';

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.css']
})
export class ContactPersonComponent implements OnInit {
  @Input() contact: Contacts;

  ngOnInit(): void {
  }

}
