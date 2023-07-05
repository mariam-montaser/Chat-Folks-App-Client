import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/members/members.service';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.getLikes();
  }

  getLikes(){
    this.membersService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      console.log('list likes: ');
      console.log(response.result);
      
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.getLikes();
  }

}
