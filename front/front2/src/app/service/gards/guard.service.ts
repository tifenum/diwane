import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../service/token-storage.service';
 

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private  tokenStorage: TokenStorageService , private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenStorage.  isLoggedIn()) {
      // L'utilisateur est authentifié, laissez-le accéder à la route
      return true;
    } else {
      // L'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      this.router.navigate(['/home'], { fragment: "loginModal"});

      return false;
    }
  }
}
