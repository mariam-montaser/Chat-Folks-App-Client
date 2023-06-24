import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AuthService, RegisterModel } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: RegisterModel= {username: '', password: ''};
  validationErrors: string[] = [];
  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.register(this.model).subscribe(response =>{
      console.log(response); 
    }, error => {
      console.log(error);
      this.validationErrors= error;
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
