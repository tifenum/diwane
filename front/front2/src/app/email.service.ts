import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:8082/api/email';

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, content: string): Observable<any> {
    const emailData = { to, subject, content };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.baseUrl}/send-email`, emailData, { headers, responseType: 'text' });
  }
}
