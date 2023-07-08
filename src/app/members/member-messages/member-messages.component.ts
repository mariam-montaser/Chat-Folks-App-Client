import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/messages/messages.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;

  @Input() messages:Message[];
  @Input() username: string;

  messageContent: string;

  constructor(private messagesService:MessagesService) { }

  ngOnInit(): void {
  }

  sendMessage(){
    this.messagesService.sendMessage(this.username, this.messageContent).subscribe(message => {
      this.messages.push(message);
      this.messageForm.reset();
      
    })
  }

}
