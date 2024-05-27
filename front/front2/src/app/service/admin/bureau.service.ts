// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bureau } from '../../models/bureau';
import { BureauDto } from '../../models/bureau-dto';
import { Demandee } from '../../models/demandee';
import { SignupRequest } from '../../models/signupRequest';
import { MessageResponse } from '../../models/message-response';

@Injectable({
  providedIn: 'root'
})
export class BureauService {
  private baseUrl = 'http://localhost:8082/api/admin'; 
  private baseeUrl = 'http://localhost:8082/api/test' // Assurez-vous que cette URL correspond à celle de votre backend

  constructor(private http: HttpClient) { }

  createEmployer(signUpRequest: SignupRequest): Observable<MessageResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<MessageResponse>(`${this.baseUrl}/createEmp`, signUpRequest, { headers });
  }

  createBureau(bureauDto: BureauDto): Observable<Bureau> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Bureau>(`${this.baseUrl}/bureau`, bureauDto, { headers });
  }

  updateBureau(id: number, bureauDto: BureauDto): Observable<Bureau> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Bureau>(`${this.baseUrl}/bureau/${id}`, bureauDto, { headers });
  }

  getAllBureaux(): Observable<Bureau[]> {
    return this.http.get<Bureau[]>(`${this.baseUrl}/bureaus`);
  }

  getAllDemandsNonArchived(): Observable<Demandee[]> {
    return this.http.get<Demandee[]>(`${this.baseUrl}/demnonarch`);
  }

  getAllDemands(): Observable<Demandee[]> {
    return this.http.get<Demandee[]>(`${this.baseUrl}/demands`);
  }

  deleteBureau(bureauId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.baseUrl}/delete/${bureauId}`);
  }





 
  
   


  getUsersBySpecificRoles(): Observable<any> {
    return this.http.get(`${this.baseeUrl}/roles`);
  }
 // Dans BureauService
}


