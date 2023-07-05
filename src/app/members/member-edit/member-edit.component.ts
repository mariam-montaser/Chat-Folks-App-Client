import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { Member } from 'src/app/models/member';
import { MembersService } from '../members.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private membersService: MembersService, private authService: AuthService, private toastrService: ToastrService) { 
    this.authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(){
    this.membersService.getMember(this.user.username).subscribe(member => {
      this.member = member
    })
  }

  updateMember(){
    this.membersService.updateMember(this.member).subscribe(() => {
      this.toastrService.success('Profile updated successfully');
      this.editForm.resetForm(this.member);
    })
  }

}
