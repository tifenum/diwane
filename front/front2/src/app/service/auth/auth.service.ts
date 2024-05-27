import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginRequest } from '../../models/login-request';
import { User } from '../../models/user';

import { RefreshTokenDto } from '../../models/refresh-token-dto';
import { AuthLoginInfo } from '../../models/authLoginInfo';
import { JwtResponse } from '../../models/jwt-response';
import { SignupRequest } from '../../models/signupRequest';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  
  providedIn: 'root'
})

  export class AuthService {
    private baseUrl = 'http://localhost:8082/api/auth'; 
    private loginUrl = 'http://localhost:8082/api/auth/signin';
    constructor(private http: HttpClient) { }
  
    refreshToken(refreshTokenDto: RefreshTokenDto): Observable<JwtResponse> {
      return this.http.post <JwtResponse>(`${this.baseUrl}/refresh-token`, refreshTokenDto);
    }
  
    register(signupRequest: SignupRequest): Observable<any> {
      return this.http.post(`${this.baseUrl}/signup`, signupRequest);
    }
  
    login(loginRequest: LoginRequest): Observable<JwtResponse> {
   console.log("Sending login request with:", loginRequest); 
   return this.http.post<JwtResponse>(`${this.baseUrl}/signin`, loginRequest);
}

attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
  return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions).pipe(
    catchError((error: any) => {
      console.error('Login error:', error);
      throw error; // Rethrow the error to propagate it to the component
    })
  );
  
}
  sendResetPasswordEmail(passwordRequestUtil: any): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/password-reset-request`, passwordRequestUtil);
  }



  sendVerificationEmail(email: string): Observable<any> {
    // Note: You need to generate the verification token on the server-side for security reasons
    return this.http.get(`${this.baseUrl}/verify-email?email=${email}`);
  }

  updatePassword(newPasswordData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, newPasswordData);
  }

 

 



  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('auth-token'); // Utiliser une clé cohérente pour le stockage du token
    return !!token;
  }
  

 

  getEmail(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/user/email`).pipe(
      catchError(error => {
        throw new Error('Error when fetching email: ' + error.message);
      })
    );
  }

}


