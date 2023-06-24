import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService, RegisterModel } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: RegisterModel= {username: '', password: ''};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.register(this.model).subscribe(response =>{
      console.log(response); 
    }, error => {
      console.log(error);
      
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
