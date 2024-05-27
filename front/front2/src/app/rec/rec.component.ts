import { Component } from '@angular/core';
import { ContService } from '../service/contact/cont.service';
import { ContactDto } from '../models/contact-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rec',
  templateUrl: './rec.component.html',
  styleUrl: './rec.component.css'
})
export class RecComponent {
  contact: ContactDto = new ContactDto
    
  subject: string = '';
  message: string = ''; 
    
 
  
    constructor(private contactService: ContService,private toastr :ToastrService) {}
  
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
  }