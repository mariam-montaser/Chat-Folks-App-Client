import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/models/message';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { getPaginationHeaders, getPaginatedResult } from '../helpers/paginationHelpers';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) {}

  getUserMessages(pageNumber, pageSize, container){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Contianer', container);
    return getPaginatedResult<Message[]>(`${this.baseUrl}/messages`,params, this.http);
  }

  getMessageThread(username: string){
    return this.http.get<Message[]>(`${this.baseUrl}/messages/thread/${username}`);
  }

  sendMessage(username: string, content: string){
    return this.http.post<Message>(`${this.baseUrl}/messages`, {recipientUsername: username, content});
  }

  deleteMessage(id: number){
    return this.http.delete(`${this.baseUrl}/messages/${id}` );
  }
}
