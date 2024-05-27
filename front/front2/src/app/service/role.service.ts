import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private tokenStorageService: TokenStorageService) { }

  getUserRole(): string | null {
    const authorities = this.tokenStorageService.getAuthorities();
    
    return authorities && authorities.length > 0 ? authorities[0] : null;
  }
}
