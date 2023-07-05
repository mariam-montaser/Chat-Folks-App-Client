import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    RegisterComponent
  ]
})
export class AuthModule { }
