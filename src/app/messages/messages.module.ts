import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    MessagesComponent
  ]
})
export class MessagesModule { }
