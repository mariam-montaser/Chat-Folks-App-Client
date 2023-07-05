import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { InputComponent } from './input/input.component';
import { InputDateComponent } from './input-date/input-date.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';



@NgModule({
  declarations: [
    InputComponent,
    InputDateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  exports:[
    NgxGalleryModule,
    BsDropdownModule,
    BsDatepickerModule,
    ToastrModule,
    TabsModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    InputComponent,
    InputDateComponent
  ]
})
export class SharedModule { }
