import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Demandee } from '../../models/demandee'; 
import { TokenStorageService } from '../token-storage.service';
import { DemandeVerify } from '../../models/demandeverify';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class InspectateurService {
    private baseUrl = 'http://localhost:8082/api/inspectateur';
    private basseUrl = 'http://localhost:8082/api/chefbr';

   // private bureauUrl = 'http://localhost:8080/api/bureau'; 

    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }
   
    private getHeaders(): HttpHeaders {
      const token = this.tokenStorageService.getToken();
  
      if (!token) {
        return new HttpHeaders();
      }
  
      return new HttpHeaders().set('Authorization', `Bearer ${token}`); // Fixed interpolation syntax
    }
  
    getAllDemandes(): Observable<Demandee[]> {
      const headers = this.getHeaders();
        return this.http.get<Demandee[]>(`${this.baseUrl}/demandes`, { headers }); // Fixed template literal
    }

    getDemandeById(id: number): Observable<Demandee> {
      const headers = this.getHeaders();
        return this.http.get<Demandee>(`${this.baseUrl}/demande/${id}`, { headers }); // Fixed template literal
    }
    getChefDemandeById(id: number): Observable<Demandee> {
      const headers = this.getHeaders();
        return this.http.get<Demandee>(`${this.basseUrl}/demande/${id}`, { headers }); // Fixed template literal
    }
   
    getProfile(): Observable<User> {
      const headers = this.getHeaders();
      return this.http.get<User>(`${this.baseUrl}/profile`, { headers }); // Fixed template literal
    }
    
    updateDemande(id: number, demande: Demandee): Observable<Demandee> {
      const headers = this.getHeaders();
        return this.http.put<Demandee>(`${this.baseUrl}/demandes/${id}`, demande, { headers }); // Fixed template literal
    }
    deleteDemande(id: number): Observable<void> {
      const url = `${this.baseUrl}/delete/${id}`;
      return this.http.delete<void>(url);
    }
    
   
    

      verifyDemand(demandeVerifieDto: DemandeVerify): Observable<any> {
        return this.http.post(`${this.baseUrl}/demverifie`, demandeVerifieDto); // Fixed template literal
    }
    

  

    getDemandesEnCours(): Observable<Demandee[]> {
      const headers = this.getHeaders();
        return this.http.get<Demandee[]>(`${this.baseUrl}/demandesencours`, { headers }); // Fixed template literal
    }
    getDemandesverifier(): Observable<Demandee[]> {
      const headers = this.getHeaders();
        return this.http.get<Demandee[]>(`${this.basseUrl}/demsverifier`, { headers }); // Fixed template literal
    }
}
