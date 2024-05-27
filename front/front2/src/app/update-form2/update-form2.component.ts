import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../service/autorisation/demande.service';
import { ToastrService } from 'ngx-toastr';
import { DocumentUploadService } from '../service/document-upload.service';
import { DemandeDto } from '../models/demande';
import { Demandee } from '../models/demandee';
import { TokenStorageService } from '../service/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-update-form2',
  templateUrl: './update-form2.component.html',
  styleUrl: './update-form2.component.css'
})
export class UpdateForm2Component implements OnInit {
  rsForm!: FormGroup;
 demande : Demandee;
 forms: any[] = [];
 id: string | null;
  constructor(
    private documentUploadService: DocumentUploadService,  // Importé une fois
    private toastr: ToastrService,
    private fb: FormBuilder,
    private autorisationService: DemandeService,
    private router:Router,
    private datePipe: DatePipe,
      public tokenService : TokenStorageService,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getAllFormById()
    this.rsForm = this.fb.group({ 
      typeDemande: ['premierD', Validators.required],
      codeDemande: ['', Validators.required],
      expirationAt: ['', Validators.required],
      brRattachement: ['', Validators.required],
      info: [''],
      paysOrigine: ['', Validators.required],
      nationalite: ['', Validators.required],
      motif: ['', Validators.required],
      autorisation: "2",
      numchassis: ['', Validators.required],
      numImmatriculation: ['', Validators.required],
      marque: ['', Validators.required],
      complementMarque: ['', Validators.required],
      quantiteQCS: [''],
     poidsNet: [''],
     valeurDeviseEtrangere:[''],
     valeurDT: [''],
      
      description: ['', Validators.required],
      interdictionsEtRestrictions: ['', Validators.required],
      guaranteeReferenceNumber: ['', Validators.required],
      declartionPrecedente: ['', Validators.required],
       echianceDate: ['', Validators.required],

     
      cinUrl: [''],
      docTaxeCirculationUrl: [''],
      passportUrl: [''],
      carteGriseUrl: [''],
      justPossessionUrl: [''],
      autrJustUrl: [''],
      assuranceUrl: [''],
     
      docPlaqueImmatriculation: [''],
      docContratAssurance: [''],
      
    });

    
  }

  
  
  onSubmit(): void {
    console.log("FormData:", this.rsForm.value);
    
      
    const formData = this.rsForm.value;
    const formattedExpirationDate = this.datePipe.transform(formData.expirationAt, 'yyyy-MM-ddTHH:mm:ss');
    const formattedEchianceDate = this.datePipe.transform(formData.echianceDate, 'yyyy-MM-ddTHH:mm:ss');

    const demandeData = new DemandeDto({
      typeDemande: formData.typeDemande,
      codeDemande: formData.codeDemande,
      expirationAt: formattedExpirationDate!,
      brRattachement: formData.brRattachement,
      info: formData.info,
      paysOrigine: formData.paysOrigine,
      nationalite: formData.nationalite,
      motif: formData.motif,
      autorisation: "2",
      numchassis: formData.numchassis,
      numImmatriculation: formData.numImmatriculation,
      marque: formData.marque,
      complementMarque: formData.complementMarque,
     
    
      description: formData.description,
      interdictionsEtRestrictions:formData.interdictionsEtRestrictions,
      guaranteeReferenceNumber: formData.guaranteeReferenceNumber,
      declartionPrecedente: formData.declartionPrecedente,
      echianceDate: formattedEchianceDate!,

    });
      console.log("demande:", demandeData);

      console.log("formValues.numchassis ",demandeData.numchassis);
      
      this.autorisationService.updateDemande(this.id , demandeData).subscribe({
        next: (response) => {
          console.log('Demande created successfully:', response);
          this.toastr.success('Demande changer avec succès!');
          this.demande=response;
          
          //add photo
          const filesFormData = this.getFilesFormData();
          console.log("filesFormData....",filesFormData)
          const id = this.demande.id
          console.log("id....",id)
          this.autorisationService.uploadPhotos(id, filesFormData).subscribe({
            next: (uploadResponse) => {
              console.log('Photos uploaded successfully:', uploadResponse);
            },
            error: (error) => {
              console.error('Error uploading photos:', error);
            }
          });

        },
        error: (error) => {
          if (error.status === 400) {
            this.toastr.error('Compléter le formulaire correctement');
          } else {
            const errorMessage = error.error?.detail || error.error?.message || error.message || 'Unknown error';
            this.toastr.error('Error creating demande: ' +  error.error.error);
          }
          console.log('Error details:', error);
        }
      });
      
   


  }
  getAllFormById(): void {
    this.autorisationService.getallForm().subscribe({
      next: (data) => {
        // Filtrer les données pour ne conserver que l'objet avec l'ID spécifique
        const form = data.find((item: { id: string | null; }) => item.id == this.id);
        if (form) {
          this.forms = [form]; // Mettre l'objet filtré dans this.forms
          console.log("Form with id ", this.id, ": ", form);
          console.log('this.forms[0].codeDemande',this.forms[0].codeDemande);
          this.rsForm = this.fb.group({ 
            typeDemande: ['premierD', Validators.required],
            codeDemande: [String(this.forms[0].codeDemande), Validators.required],
            expirationAt: [this.forms[0].createdAt.substring(0, 11), Validators.required],
            brRattachement: [this.forms[0].brRattachement, Validators.required],
            info: [this.forms[0].info, Validators.required],
            paysOrigine: [this.forms[0].paysOrigine, Validators.required],
            nationalite: [this.forms[0].nationalite, Validators.required],
            motif: ['asc', Validators.required],
            autorisation: "2",
            numchassis: [this.forms[0].numchassis, Validators.required],
            numImmatriculation: [this.forms[0].numImmatriculation, Validators.required],
            marque: [this.forms[0].marque, Validators.required],
            complementMarque: [this.forms[0].complementMarque, Validators.required],
            quantiteQCS: [''],
           poidsNet: [''],
           valeurDeviseEtrangere:[''],
           valeurDT: [''],
            
            description: [this.forms[0].description, Validators.required],
            interdictionsEtRestrictions: [this.forms[0].interdictionsEtRestrictions, Validators.required],
            guaranteeReferenceNumber: [this.forms[0].guaranteeReferenceNumber, Validators.required],
            declartionPrecedente: [this.forms[0].declartionPrecedente, Validators.required],
             echianceDate: [this.forms[0].echianceDate, Validators.required],
      
           
            cinUrl: [''],
            docTaxeCirculationUrl: [''],
            passportUrl: [''],
            carteGriseUrl: [''],
            justPossessionUrl: [''],
            autrJustUrl: [''],
            assuranceUrl: [''],
           
            docPlaqueImmatriculation: [''],
            docContratAssurance: [''],
            
          });
        } else {
          console.log("Form with id ", this.id, " not found.");
        }
      },
      error: (err) => {
        console.log('Error loading Form', err);
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
