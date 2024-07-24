import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoGeneratorService {
  private apiUrl = 'http://localhost:3000/generate-video';

  constructor(private http: HttpClient) {}

  generateVideo(text: string): Observable<{ videoUrl: string }> {
    return this.http.post<{ videoUrl: string }>(this.apiUrl, { text });
  }
}
