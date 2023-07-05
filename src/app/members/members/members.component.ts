import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { Member } from 'src/app/models/member';
import { MembersService } from '../members.service';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  // members$: Observable<Member[]>;
  members: Member[];
  user: User;
  userParams: UserParams;
  pagination: Pagination;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];

  constructor(private membersService: MembersService) { 
    console.log('members constrctor');
    
    this.userParams = this.membersService.getUserParams();
  }

  ngOnInit(): void {
    console.log('members oninit');

    this.getMembers();
  }

  getMembers(){
    console.log('members get members');
    
      this.membersService.setUserParams(this.userParams);
      this.membersService.getMembers(this.userParams).subscribe(response => {
        console.log('members:=================');
        console.log(response);
        
        this.members = response.result;
        this.pagination = response.pagination;
      })
  }

  resetFilters(){
    this.userParams = this.membersService.resetUserParams();
    this.getMembers();
  }

  pageChanged(event:any){
    // console.log(event);
    // if (this.userParams.currentPage !== event.page) {
    //   this.userParams.currentPage = event.page;
    //   this.getMembers();
    // }
    this.userParams.currentPage = event.page;
    this.membersService.setUserParams(this.userParams);
    this.getMembers();
  }

}
