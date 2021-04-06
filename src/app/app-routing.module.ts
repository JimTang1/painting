import {NgModule}   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HeaderComponent } from './header/header.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactPersonComponent } from './contacts/contact-person/contact-person.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';


const appRoutes : Routes =[
    { path: '', redirectTo: '/documents', pathMatch: 'full' },
    { path: 'documents', component: DocumentsComponent, children:[
      {path: 'new', component:DocumentEditComponent},
      {path: ':id' ,component:DocumentDetailComponent},
      {path: ':id/Edit' , component:DocumentEditComponent}
    ]},
    { path: 'contacts', component: ContactsComponent, children: [
      {path: 'new', component:ContactEditComponent},
      {path: ':id', component: ContactDetailComponent},
      {path: ':id/Edit', component: ContactEditComponent}
    
    ]},
    { path: 'messages', component: MessageListComponent},
  ];
  
@NgModule({
    imports :[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}