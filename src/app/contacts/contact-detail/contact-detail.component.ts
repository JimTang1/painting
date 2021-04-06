import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';
import { ContactService } from '../contact.service';
import { Contacts} from '../contacts.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contacts;
  id:string;
  nativeWindow: any;

  constructor( private route:ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private windowRefService: WinRefService) {
      this.nativeWindow = windowRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) =>{
      this.id = params['id'];
      this.contact= this.contactService.getContact(this.id);
    })
  }

  onEditContact(){
    this.router.navigate(['Edit'],{relativeTo: this.route});
  }

    onDelete(){
      this.contactService.deleteContact(this.contact);
    }
}
