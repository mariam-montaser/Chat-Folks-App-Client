import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { Pagination } from 'src/app/models/pagination';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.getUserMessages();
  }


  getUserMessages(){
    this.loading = true;
    this.messagesService.getUserMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      console.log(response);
      
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  deleteMessage(id: number){
    this.messagesService.deleteMessage(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.getUserMessages();
  }

}
