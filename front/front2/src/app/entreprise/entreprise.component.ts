import { Component } from '@angular/core';
 // Assurez-vous que le chemin d'import est correct
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  

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
}
