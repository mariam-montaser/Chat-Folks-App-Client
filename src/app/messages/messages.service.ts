import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/models/message';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginationHeaders, getPaginatedResult } from '../helpers/paginationHelpers';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { User } from '../models/user';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();
  

  constructor(private http: HttpClient) {}


  createConnectionHub(user: User, otherUsername:string){
    this.hubConnection =  new HubConnectionBuilder().withUrl(`${this.hubUrl}/messages?user=${otherUsername}`).withAutomaticReconnect().build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on("ReceiveMessageThread", messages => {
      this.messageThreadSource.next(messages);
    })

    this.hubConnection.on("NewMessage", message => {
      this.messageThread$.pipe(take(1)).subscribe(messages => {
          this.messageThreadSource.next([...messages, message]);
      })
    })

    this.hubConnection.on("UpdatedGroup", (group: Group) => {
      if(group.connections.some(c => c.username === otherUsername)){
        this.messageThread$.pipe(take(1)).subscribe(messages => {
          messages.forEach(message => {
            if(!message.dateRead){
              message.dateRead = new Date(Date.now());
            }
          })
          this.messageThreadSource.next([...messages]);
        }) 
      }
    })
  }

  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop();
    }
  }

  getUserMessages(pageNumber, pageSize, container){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Contianer', container);
    return getPaginatedResult<Message[]>(`${this.baseUrl}/messages`,params, this.http);
  }

  getMessageThread(username: string){
    return this.http.get<Message[]>(`${this.baseUrl}/messages/thread/${username}`);
  }

  // sendMessage(username: string, content: string){
  //   return this.http.post<Message>(`${this.baseUrl}/messages`, {recipientUsername: username, content});
  // }
  async sendMessage(username: string, content: string){
    return this.hubConnection.invoke('SendMessage', {recipientUsername: username, content}).catch(error => console.log(error));
  }

  deleteMessage(id: number){
    return this.http.delete(`${this.baseUrl}/messages/${id}` );
  }
}
