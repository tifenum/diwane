import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:8082/api/admin/dashboard';
  private basseUrl = 'http://localhost:8082/api/admin';


  constructor(private http: HttpClient) { }

  countAllDemandes(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/all`);
  }

  countDemandesByStatue(statue: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/statue/${statue}`);
  }

  getDemandesByStatues(): Observable<{ statue: string, count: number }[]> {
    const statues = ['VALIDE', 'VERIFIE', 'ENCOURS', 'REFUSE'];
    const requests = statues.map(statue => this.countDemandesByStatue(statue).pipe(
      map(count => ({ statue, count }))
    ));
    return forkJoin(requests);
  }

  countUsersByRole(): Observable<{ [key: string]: number }> {
    const token = sessionStorage.getItem('token'); // Assurez-vous que le token est stocké dans le sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ [key: string]: number }>(`${this.basseUrl}/countByRole`, { headers });
  }


  countAllUsers(): Observable<number> {
   
    return this.http.get<number>(`${this.basseUrl}/count/allUsers`);
  }
}
