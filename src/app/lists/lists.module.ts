import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MembersModule } from '../members/members.module';



@NgModule({
  declarations: [
    ListsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MembersModule,
    FormsModule
  ],
  exports: [
    ListsComponent
  ]
})
export class ListsModule { }
