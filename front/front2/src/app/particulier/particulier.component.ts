import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
@Component({
  selector: 'app-particulier',
  templateUrl: './particulier.component.html',
  styleUrl: './particulier.component.css'
})
export class ParticulierComponent {
  constructor(private router: Router,
    public tokenService : TokenStorageService) {}
  navigateToAutorisation1() {
    this.router.navigate(['/autorisation1']);
  }
  navigateToRS() {
    this.router.navigate(['/autorisation2']);
  }
  navigateToFCR() {
    this.router.navigate(['/autorisation4']);
  }
  navigateToRSS() {
    this.router.navigate(['/autorisation3']);
  }
  logout() :void {
    this.tokenService.signOut();
    this.router.navigateByUrl("/home");
  }
}
