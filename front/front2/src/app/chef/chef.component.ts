import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeVerify } from '../models/demandeverify';
import { InspectateurService } from '../service/bureau/inspectateur.service';
import { Demandee } from '../models/demandee'; 
import { DocumentUploadService } from '../service/document-upload.service';
import { UserService } from '../service/profil/user.service';
import { User } from '../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  
import { BureauService } from '../service/admin/bureau.service';
import { ToastrService } from 'ngx-toastr';
import { ContactDto } from '../models/contact-dto';
import { ContService } from '../service/contact/cont.service';
import { ChefBRService } from '../service/bureau/chef-br.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  contact: ContactDto = new ContactDto();
  user: User;
  demandes: Demandee[] = [];
  id = this.activeroute.snapshot.params['id']; 

  constructor(
    private contactService: ContService,
    private activeroute: ActivatedRoute,
    private documentUploadService: DocumentUploadService,
    private inspecteurService: InspectateurService,
    private userService: UserService, 
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private chefBRService: ChefBRService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.isLoggedIn()) {
      this.getUserProfile();
      this.loadDemandes();
    }
  }

  sendContactMessage(): void {
    if (this.contact.subject && this.contact.message) {
      this.contactService.sendMessage(this.contact).subscribe({
        next: (response) => {
          this.toastr.success('Message envoyé avec succès!');
        },
        error: (error) => {
          this.toastr.error('Erreur lors de l\'envoi du message.', error);
        }
      });
    }
  }
  
  getUserProfile(): void {
    this.chefBRService.getProfile().subscribe({
      next: (res) => {
        this.user = res;
        console.log("User loaded:", this.user);
        this.toastr.success('Profil chargé avec succès');
      },
      error: (error) => {
        console.error('Error fetching user profile', error);
        this.toastr.error('Erreur de chargement du profil');
      }
    });
  }

  loadDemandes(): void {
    this.inspecteurService.getDemandesverifier().subscribe({
      next: (data) => {
        this.demandes = data;
        console.log("Demandes loaded:", data);
      },
      error: (error) => {
        console.error('Error fetching demandes', error);
      }
    });
  }

  logout(): void {
    console.log('Utilisateur déconnecté');
    this.router.navigate(['/home']);
  }

  reclama(): void {
    this.router.navigate(['/rec']);
  }
}
