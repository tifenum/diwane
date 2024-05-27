import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeDto } from '../../models/demande';
import { Demandee } from '../../models/demandee';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  
  private apiUrl = 'http://localhost:8082/api/user'; // Update to your actual API URL
   

  constructor(private http: HttpClient,
    private  tokenStorageService :TokenStorageService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getDemandeStatus(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/demStatus/${id}`);
}

  sendFormData(demandeDtoRequest: DemandeDto): Observable<any> {
   
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/dem`, demandeDtoRequest, { headers });
   
  }
 
  uploadPhotos(id: number, formData: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}${id}/addphotos`, formData, { headers, responseType: 'text' as 'json' });
  }
  

  getallForm():Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/dems`, { headers });
  }
  updateDemande(id: string | null, updatedData: DemandeDto): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch<any>(`${this.apiUrl}/demupdate/${id}`, updatedData , { headers });
  }
  }