import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr'; 
import { TokenStorageService } from '../../service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanLoad {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService  
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRole = route.data?.['role'] as string;

    if (this.tokenStorage.isLoggedIn()) {
      const userRoles = this.tokenStorage.getAuthorities();
      const hasRequiredRole = userRoles.some(role => role.toLowerCase() === requiredRole.toLowerCase());

      if (hasRequiredRole) {
        return true;
      } else {
        
        this.toastr.error("Accès refusé. Vous n'avez pas les droits nécessaires pour accéder à cette page.");
        this.router.navigate(['/home']);
        return false;
      }
    } else {
      
      this.toastr.error("Vous devez être connecté pour accéder à cette page.");
      this.router.navigate(['/home']);
      return false;
    }
  }
}
