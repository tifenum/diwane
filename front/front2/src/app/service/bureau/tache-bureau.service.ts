import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TacheBureau  } from '../../models/tache-bureau';

@Injectable({
  providedIn: 'root'
})
export class TacheBureauService {
  private apiUrl = 'http://localhost:8082/api/tachebureau';  // Ajustez selon votre URL de l'API

  constructor(private http: HttpClient) {}

  assignTache(tacheBureau: TacheBureau): Observable<TacheBureau> {
    return this.http.post<TacheBureau>(this.apiUrl + '/assign', tacheBureau);
  }
}
