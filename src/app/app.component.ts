import { Component, OnInit  } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './models/user';
import { PresenceService } from './shared/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private authService: AuthService, private presenceService: PresenceService){}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user){
      this.authService.setCurrentUser(user);
      this.presenceService.createHubConnection(user);
    }
  }
}
