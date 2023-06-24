import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';



@NgModule({
  declarations: [
    MembersComponent,
    MemberDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MembersModule { }
