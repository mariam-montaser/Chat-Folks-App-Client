import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {Member} from '../models/member';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { UserParams } from '../models/userParams';
import { PaginationResult } from '../models/pagination';
import { getPaginatedResult, getPaginationHeaders } from '../helpers/paginationHelpers';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  user:User;
  userParams: UserParams;

  memberCash  = new Map();

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(this.user);
    })
  }

  getMembers(userParams: UserParams){
    const response = this.memberCash.get(Object.values(userParams).join('-'));
    console.log('Cash:=================');
    console.log(response);
    if(response) return of(response);
    
    let params = getPaginationHeaders(userParams.currentPage, userParams.pageSize);

    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('orderBy', userParams.orderBy);

    console.log('params:');
    console.log(params);
    
    return getPaginatedResult<Member[]>(`${this.baseUrl}/users`, params, this.http).pipe(
      map(response => {
        console.log('Service getPaginatedResult: ================');
        console.log(response);
        
        this.memberCash.set(Object.values(userParams).join('-'), response)
        return response;
      })
    )
  }

  getMember(username: string){
    
    const member = [...this.memberCash.values()]
    .reduce((arr, ele) => arr.concat(ele.result), [])
    .find((member: Member) => member.username === this.user.username);
    if(member) return of(member);
    return this.http.get<Member>(`${this.baseUrl}/users/${username}`);
  }

  updateMember(member: Member){
    return this.http.put(`${this.baseUrl}/users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  addLike(username: string){
    return this.http.post(`${this.baseUrl}/likes/${username}`, {});
  }

  getLikes(predicate: string, pageNumber, pageSize){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(`${this.baseUrl}/likes/`,params, this.http);
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(userParams: UserParams){
    console.log(userParams);
    
    console.log(this.userParams);
    this.userParams = userParams;

  }

  resetUserParams() {
    console.log('Reset');
    
    console.log(this.user);
    
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  // private getPaginatedResult<T>(url, params){
  //   const paginationResult: PaginationResult<T> = new PaginationResult<T>();
  //   return this.http.get<T>(url, {observe: 'response', params}).pipe(
  //     map(response => { 
  //       console.log("http response: ======================");
  //       console.log(response);
        
  //       paginationResult.result = response.body;
  //       if(response.headers.get('pagination')!== null){
  //         paginationResult.pagination = JSON.parse(response.headers.get('pagination'));
  //       }
  //       return paginationResult;
  //     })
  //   )
  // }

  // private getPaginationHeaders(pageNumber: number, pageSize: number) {
  //   let params = new HttpParams();

  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString());

  //   return params;
  // }
}
