import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor{

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
  if(sessionStorage.getItem("token")){
   
 req=req.clone({
  headers:new  HttpHeaders({
    Authorization:"Bearer "+(sessionStorage.getItem("token"))
  })
})
  }
return next.handle(req)
  }
}   