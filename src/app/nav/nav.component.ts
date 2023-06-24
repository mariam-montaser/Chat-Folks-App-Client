import { Component, OnInit } from '@angular/core';
import { AuthService, LoginModel } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: LoginModel = {username: '', password: ''};

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.model);
    
    this.authService.login(this.model).subscribe(response =>{
      console.log(response); 
    }, error => {
      console.log(error);
      
    })
  }

  logout(){
    this.authService.logout();
  }

}
