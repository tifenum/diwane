import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8082/api/avis'; // URL de votre API

  constructor(private http: HttpClient) { }

  sendFeedback(feedbackText: string): Observable<any> {
    return this.http.post(this.apiUrl, { feedback: feedbackText });
  }
}
