import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AuthService, RegisterModel } from '../auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  //model: RegisterModel= {username: '', password: ''};
  validationErrors: string[] = [];
  registerForm: FormGroup;
  maxDate: Date;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  register(){
    this.authService.register(this.registerForm.value).subscribe(response =>{
      console.log(response); 
      this.router.navigateByUrl('/members');
    }, error => {
      console.log(error);
      this.validationErrors= error;
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
