import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


export interface LoginModel{
  username: string; 
  password: string
}

export interface RegisterModel{
  gender: string; 
  username: string; 
  knownAs: string; 
  city: string; 
  country: string; 
  dateOfBirth: string; 
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  register(user: RegisterModel){
    return this.http.post<User>(`${this.baseUrl}/Accounts/register`, user).pipe(
      map(user => {
        if(user){
          this.storeUserData(user);
        }
      })
    )
  }

  login(user: LoginModel){
    console.log(user)
    return this.http.post<User>(`${this.baseUrl}/accounts/login`, user).pipe(
      map(user => {
        console.log(user);
        
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles)? user.roles = roles : user.roles.push(roles);
    console.log("user Role:------------------");
    console.log(user);
    console.log(user.roles);
    
    this.storeUserData(user);

  }

  private storeUserData(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  private getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }
}
