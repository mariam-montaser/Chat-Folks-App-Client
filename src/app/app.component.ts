import { Component, OnInit  } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.setCurrentUser(user);
  }
}
