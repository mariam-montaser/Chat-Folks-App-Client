import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MemberMessagesComponent } from './member-messages/member-messages.component';



@NgModule({
  declarations: [
    MembersComponent,
    MemberDetailsComponent,
    MemberCardComponent,
    MemberEditComponent,
    MemberMessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    MembersComponent,
    MemberDetailsComponent,
    MemberCardComponent,
    MemberEditComponent
  ]
})
export class MembersModule { }
