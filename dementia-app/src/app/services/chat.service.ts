// src/app/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChatMessage } from './model/model.model';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://a5f6-152-58-238-147.ngrok-free.app/ai/conversationRoutine'; 

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<ChatMessage> {
    // return this.http.post<ChatMessage>(this.apiUrl, { text: message });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    });
    const url = `${this.apiUrl}?message=${encodeURIComponent(message)}`;
    return this.http.post<any>(url, headers );
  }
}
