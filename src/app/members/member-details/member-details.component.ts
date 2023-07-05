import { Component, OnInit, ViewChild} from '@angular/core';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

import { MembersService } from '../members.service';
import { Member } from 'src/app/models/member';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/models/message';
import { MessagesService } from 'src/app/messages/messages.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent

  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(private membersService: MembersService, private messageService: MessagesService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.member = data.member);
    this.route.queryParams.subscribe(params => params.tab ? this.selectTab(params.tab) : this.selectTab(0));
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[]{
    const imagesUrl = [];
    for(let photo of this.member.photos){
      imagesUrl.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imagesUrl;
  }

  getMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages.length === 0){
      this.getMessages();
    }
  }

}
