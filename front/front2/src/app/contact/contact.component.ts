import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContService } from '../service/contact/cont.service';  // Importez votre service ici
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ContactDto } from '../models/contact-dto';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
 
  contact: ContactDto = new ContactDto
    
  subject: string = '';
  message: string = ''; 
    
 
  
    constructor(private contactService: ContService,private toastr :ToastrService,private router:Router,
      public tokenService : TokenStorageService) {}
  
    sendContactMessage(): void {
      if (this.contact.subject && this.contact.message) {

        this.contactService.sendMessage(this.contact).subscribe({
          next: (response) => {
            this.toastr.success('Utilisateur enregistré avec succès ! Vérifiez votre e-mail pour activer votre compte.');
          },
          error: (error) => {
            this.toastr.error('Erreur lors de l\'enregistrement.', error);
          }
        });
      }
    }
    goToCompte() :void{
      this.router.navigateByUrl("/compte")
    }
    logout() :void {
      this.tokenService.signOut();
      this.router.navigateByUrl("/home");
    }
}