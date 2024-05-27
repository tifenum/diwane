import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from '../../models/user'; 
import { UpdateUserDto } from '../../models/update-user-dto';
import { TokenStorageService } from '../token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8082/api/user';
  private baseUrll = 'http://localhost:8082/api/test';

  constructor(private http: HttpClient, private  tokenStorageService :TokenStorageService) { }
  private getHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();
  
    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getProfile(): Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${this.baseUrl}/profile`,{ headers });
  }
  getUserbyId (id: number): Observable <User>{
    return this.http.get<User>(`${this.baseUrll}/${id}`)
  }

  updateProfile( updateUserDto:UpdateUserDto ): Observable<User>  {
    const headers = this.getHeaders();

    return this.http.post<User>(`${this.baseUrl}/updateProfile`, updateUserDto,{ headers });
  }
 
  uploadPhoto(profilePhoto: File): Observable<string> {
    const formData = new FormData();
    formData.append('profilePhoto', profilePhoto);

    return this.http.post<string>(`${this.baseUrl}/uploadphoto`, formData);
  }}
