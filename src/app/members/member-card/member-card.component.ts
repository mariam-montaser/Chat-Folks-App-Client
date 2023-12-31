import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from '../members.service';
import { ToastrService } from 'ngx-toastr';
import { PresenceService } from 'src/app/shared/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input() member: Member

  constructor(private membersService: MembersService, public presenceService: PresenceService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addLike(member: Member){
    this.membersService.addLike(member.username).subscribe(() =>{
      console.log('like user');
      this.toastr.success('You have liked ' + member.knownAs);
    })
  }

}
