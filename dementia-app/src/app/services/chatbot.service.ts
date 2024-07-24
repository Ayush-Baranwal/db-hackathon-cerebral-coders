import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://a5f6-152-58-238-147.ngrok-free.app/ai/conversation'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  postData(data: string): Observable<any> {
    console.log(data)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    });
    const url = `${this.apiUrl}?message=${encodeURIComponent(data)}`;
    return this.http.post<any>(url, headers );
  }

  getResponse(query: string): string {
    return "This is a response to your query: " + query;
  }
}
