import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactDto } from '../../models/contact-dto';

@Injectable({
  providedIn: 'root'
})
export class ContService {
  private apiUrl =' http://localhost:8082/api/contact'; 
  constructor(private http: HttpClient) {}
    sendMessage(contactDto: ContactDto):Observable<ContactDto> {
      return this.http.post<ContactDto>(`${this.apiUrl}/send`,contactDto);
    }
  
    getAllMessages(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/messages`);
    }
  }

