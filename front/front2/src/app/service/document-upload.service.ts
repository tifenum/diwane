import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {
  private apiUrl = 'http://localhost:8082/api/user';  // Ajustez cette URL en fonction de votre point de terminaison API réel

  constructor(private http: HttpClient,private tokenStorageService: TokenStorageService) { }
  private getHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  uploadPhotos(id: number, photo: File, title: string): Observable<string> {
    const headers = this.getHeaders();

    const formData: FormData = new FormData();
    formData.append('photo', photo, photo.name);

  

    return this.http.post<string>(`${this.apiUrl}/uploadphoto/${id}?title=${title}`, formData, { headers });
  }
  
}
