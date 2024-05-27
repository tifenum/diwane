import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../service/autorisation/demande.service';
import { ToastrService } from 'ngx-toastr';
import { DocumentUploadService } from '../service/document-upload.service';
import { DemandeDto } from '../models/demande';
import { Demandee } from '../models/demandee';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-autorisation1',
  templateUrl: './autorisation1.component.html',
  styleUrls: ['./autorisation1.component.css'] 
})
export class Autorisation1Component implements OnInit {
  rsForm!: FormGroup;
 demande : Demandee;
  constructor(
    private documentUploadService: DocumentUploadService,  // Importé une fois
    private toastr: ToastrService,
    private fb: FormBuilder,
    private autorisationService: DemandeService,
    private router:Router,
    private datePipe: DatePipe,
      public tokenService : TokenStorageService
  ) {}

  ngOnInit(): void {
    this.rsForm = this.fb.group({ 
      typeDemande: ['', Validators.required],
      codeDemande: ['', Validators.required],
      expirationAt: ['', Validators.required],
      brRattachement: ['', Validators.required],
      brFrontalier: ['', Validators.required],
      info: [''],
      paysOrigine: ['', Validators.required],
      nationalite: ['', Validators.required],
      motif: ['', Validators.required],
      autorisation: "1",
      numchassis: ['', Validators.required],
      numImmatriculation: ['', Validators.required],
      marque: ['', Validators.required],
      complementMarque: ['', Validators.required],

      
      cinUrl: [''],
      docTaxeCirculationUrl: [''],
      passportUrl: [''],
      carteGriseUrl: [''],
      justPossessionUrl: [''],
      autrJustUrl: [''],
      assuranceUrl: [''],
     
      docPlaqueImmatriculation:[''],
      docContratAssurance:[''],
      
    });

    
  }

  
  
  onSubmit(): void {
    console.log("FormData:", this.rsForm.value);
    
      

    const formData = this.rsForm.value;
    const formattedDate = this.datePipe.transform(formData.expirationAt, 'yyyy-MM-ddTHH:mm:ss');
    
    

    const demandeData = new DemandeDto({
      typeDemande: formData.typeDemande,
      codeDemande: formData.codeDemande,
      expirationAt: formattedDate!,
      brRattachement: formData.brRattachement,
      brFrontalier: formData.brFrontalier,
      info: formData.info,
      paysOrigine: formData.paysOrigine,
      nationalite: formData.nationalite,
      motif: formData.motif,
      autorisation: "1",
      numchassis: formData.numchassis,
      numImmatriculation: formData.numImmatriculation,
      marque: formData.marque,
      complementMarque: formData.complementMarque,
    });
      console.log("demande:", demandeData);


      
      this.autorisationService.sendFormData(demandeData).subscribe({
        next: (response) => {
          console.log('Demande created successfully:', response);
          this.toastr.success('Demande soumise avec succès!');
          this.demande=response;
          
          //add photo
          const filesFormData = this.getFilesFormData();
          console.log("filesFormData....",filesFormData)
          const id = this.demande.id
          console.log("id....",id)
          // this.autorisationService.uploadPhotos(id, filesFormData).subscribe({
          //   next: (uploadResponse) => {
          //     console.log('Photos uploaded successfully:', uploadResponse);
          //   },
          //   error: (error) => {
          //     console.error('Error uploading photos:', error);
          //   }
          // });

        },
        error: (error: any) => {
          console.log(formData);
          
          if (error.status === 400) {
            this.toastr.error('Compléter le formulaire correctement');
          } else {
            this.toastr.error('Erreur lors de l’envoi des données',error.error.error);
          }
          console.error('Erreur lors de l’envoi des données', error);
        }
      });
      
   


  }

  private getFilesFormData(): FormData {
    const formData = new FormData();
    const inputElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type=file]');
    inputElements.forEach(inputElement => {
      if (inputElement.files) {
        Array.from(inputElement.files).forEach(file => {
          formData.append(inputElement.name, file);
        });
      }
    });
    return formData;
  }


 




getPlaceholder1(): string {
  return "Votre message ici1";
}

getPlaceholder2(): string {
  return "Copie CIN du propriétaire du véhicule\n" +
         "Copie CIN du bénéficiaire\n" +
         "Permis de conduire du bénéficiaire\n" +
         "Contrat de travail\n" +
         "Attestation d'affiliation CNSS\n" +
         "Reçu de paiement dernier trimestre CNSS\n" +
         "Autres justificatifs";
}

getPlaceholder3(): string {
  return "Saisissez votre CIN ou votre numéro de passeport";
}

getPlaceholder4(): string {
  return " 4 ";
}

getPlaceholder5(): string {
  return "Cette date doit être comprise entre 3 jours et 90 jours";
}

getPlaceholder6(): string {
  return "Votre message ici6";
}

getPlaceholder7(): string {
  return "Votre message ici7";
}

getPlaceholder8(): string {
  return "Votre message ici8";
}

getPlaceholder9(): string {
  return "Saisissez votre immatriculation";
}

getPlaceholder10(): string {
  return "Choisissez votre nationalité";
}

getPlaceholder11(): string {
  return "Votre message ici 11";
}

getPlaceholder12(): string {
  return "Votre message ici 10";
}

getPlaceholder13(): string {
  return "Choisissez votre nationalité";
}

getPlaceholder14(): string {
  return "Saisissez votre immatriculation";
}

getPlaceholder15(): string {
  return "Votre message ici 15";
}

getPlaceholder16(): string {
  return "Votre message ici 16";
}

getPlaceholder17(): string {
  return "Votre message ici 17";
}

getPlaceholder18(): string {
  return "Votre message ici 18";
}

getPlaceholder19(): string {
  return "Choisissez votre nationalité";
}

getPlaceholder20(): string {
  return "Choisissez votre nationalité";
}

getPlaceholder21(): string {
  return "Choisissez votre nationalité";
}
getPlaceholder(): string {
  return "Votre message ici";
}

goToCompte() :void{
  this.router.navigateByUrl("/compte")
}
logout() :void {
  this.tokenService.signOut();
  this.router.navigateByUrl("/home");
}
}