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

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  contact: ContactDto = new ContactDto
    
  subject: string = '';
  message: string = ''; 
    
  currentDemande?: Demandee[] = []; 

  demandes: Demandee[] = []; 
  user: User;
  id = this.activeroute.snapshot.params['id']; 
  constructor(
    private contactService: ContService,
    private activeroute: ActivatedRoute,
    private documentUploadService: DocumentUploadService,
    private inspecteurService: InspectateurService,
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.loadDemandes();
  }
  getUserProfile() : void{
    this.userService.getProfile().subscribe((res:User)=>{
      this.user = res;
      console.log ("user",this.user)
      this.toastr.success('Profil chargé avec succès');
    });
  }
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
  

  

 
  loadDemandes(): void {
    this.inspecteurService.getDemandesverifier().subscribe({
      next: (data) => {

        this.demandes = data;
        console.log( "demandeeeeeeee",data);
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
  reclama(){
    this.router.navigate(['/rec']);
  }
}
