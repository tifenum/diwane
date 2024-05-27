import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demandee } from '../models/demandee'; 
import { UserService } from '../service/profil/user.service';
import { User } from '../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  
import { ToastrService } from 'ngx-toastr';
import { ContactDto } from '../models/contact-dto';
import { ContService } from '../service/contact/cont.service';
import { TokenStorageService } from '../service/token-storage.service';
import { InspectateurService } from '../service/bureau/inspectateur.service';
import { DocumentUploadService} from '../service/document-upload.service';

@Component({
  selector: 'app-inspecteur',
  templateUrl: './inspecteur.component.html',
  styleUrls: ['./inspecteur.component.css']
})
export class InspecteurComponent implements OnInit {
  contact: ContactDto = new ContactDto();
  user: User;
  demandes: Demandee[] = []; 

  constructor(
    private contactService: ContService,
    private documentUploadService: DocumentUploadService,
    private inspecteurService: InspectateurService,
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private tokenService: TokenStorageService,
  ) {}

  ngOnInit(): void {
    if (this.tokenService.isLoggedIn()) {
      this.getUserProfile();
      this.loadDemandes();
    }
  }

  getUserProfile() : void{
    this.inspecteurService.getProfile().subscribe((res)=>{
      this.user = res;
      console.log ("user.............",this.user)
      
      this.toastr.success('Profil chargé avec succès');
    });
  }
  sendContactMessage(): void {
    if (this.contact.subject && this.contact.message) {
      this.contactService.sendMessage(this.contact).subscribe({
        next: (response) => {
          this.toastr.success('Message envoyé avec succès !');
        },
        error: (error) => {
          this.toastr.error('Erreur lors de l\'envoi du message.', error);
        }
      });
    }
  }

  loadDemandes(): void {
    this.inspecteurService.getDemandesEnCours().subscribe({
      next: (data: Demandee[]) => {
        this.demandes = data;
        console.log("Demandes loaded", data);
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
