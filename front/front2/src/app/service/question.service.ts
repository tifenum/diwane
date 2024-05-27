import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questions } from '../models/questions';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:8082/api/questions'; 

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addQuestion(question: any): Observable<any> {
    return this.http.post(this.apiUrl, question);
  }
  sendQuestion(questionText: string): Observable<Questions> {
    const question = { text: questionText, answer: '' }; // Adjust as per your API requirements
    return this.http.post<Questions>(this.apiUrl, question);
  }
  updateQuestion(question: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${question.id}`, question);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getAllQuestions(): Observable<Questions[]> {
    return this.http.get<Questions[]>(this.apiUrl);
  }
}