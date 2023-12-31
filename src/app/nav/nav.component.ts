import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AuthService, LoginModel } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: LoginModel = {username: '', password: ''};

  constructor(public authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.model);
    this.authService.login(this.model).subscribe(response =>{
      console.log(response); 
      this.router.navigateByUrl('/members');
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
