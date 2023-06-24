import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import { ReplaySubject } from 'rxjs';


export interface LoginModel{
  username: String; 
  password: String
}

export interface RegisterModel{
  username: String; 
  password: String
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api';
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
        if(user){
          this.storeUserData(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  private storeUserData(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
