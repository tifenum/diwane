import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:8082/api/api/inspectateur/demandesencours`' // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }
  getDemandesEnCours(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
