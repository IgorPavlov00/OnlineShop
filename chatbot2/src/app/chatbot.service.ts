import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  constructor(private http: HttpClient) {}

  getBotResponse(message: string): Observable<string> {
    return this.http.post<string>('http://localhost:5005/webhooks/rest/webhook', { message });
  }
}
