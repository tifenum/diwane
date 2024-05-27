import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../service/autorisation/demande.service';
import { FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { DocumentUploadService } from '../service/document-upload.service';
import {DemandeDto} from'../models/demande';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-form4',
  templateUrl: './update-form4.component.html',
  styleUrl: './update-form4.component.css'
})
export class UpdateForm4Component implements OnInit {
  rsForm !: FormGroup;
  forms: any[] = [];
  id: string | null;
  constructor( private documentUploadService: DocumentUploadService,private fb: FormBuilder, private autorisationService: DemandeService, private toastr: ToastrService, private datePipe: DatePipe, private route: ActivatedRoute) {}

 

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getAllFormById()
    this.rsForm = this.fb.group({
     typeDemande: ['', Validators.required],
      codeDemande: ['', [Validators.required, Validators.pattern(new RegExp('^\\d{8}$'))]],
      nom:['', Validators.required],
      prenom:['', Validators.required],
      cinCarteSejour :['', Validators.required],
      expirationAt:['', Validators.required],
      
      brRattachement: ['', Validators.required],
      brFrontalier: ['', Validators.required],
      description:[''],
      numchassis: ['', Validators.required],
    
      numImmatriculation :['', [Validators.required, Validators.pattern(new RegExp('XX-123-XX'))]],
      marque: ['', Validators.required],
      complementMarque : ['', Validators.required],
      interdictionsEtRestrictions: ['', Validators.required],
      info : [''],
      paysOrigine : ['', Validators.required],
      declartionPrecedente :  ['', Validators.required],
      motifArret: ['', Validators.required],  
      quantiteQCS :['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      poidsNet : ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      valeurDeviseEtrangere :['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      valeurDT:['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      motif: ['', Validators.required],
      
      cinUrl: ['', Validators.required],
      docPlaqueImmatriculation: [''],
     
      docContratAssurance: [''],
     
    });     

  

 

   
 
  }

  files: {[key: string]: File} = {};

  handleFileInput(files: FileList | null, key: string): void {
    if (files && files.length > 0) {
      this.files[key] = files[0];
    }
  }
  
    onSubmit(): void {
      const formValues = this.rsForm.value;
      const formattedExpirationDate = this.datePipe.transform(formValues.expirationAt, 'yyyy-MM-ddTHH:mm:ss');
      
      const formData = new DemandeDto({
        typeDemande: formValues.typeDemande,
        codeDemande: formValues.codeDemande,
        expirationAt: formattedExpirationDate!,
        brRattachement: formValues.brRattachement,
        numchassis: formValues.numchassis,
        numImmatriculation: formValues.numImmatriculation,
        marque: formValues.marque,
        complementMarque: formValues.complementMarque,
        interdictionsEtRestrictions: formValues.interdictionsEtRestrictions,
        info: formValues.info,
        // guaranteeReferenceNumber: formValues.guaranteeReferenceNumber,
        // montantGarantie: formValues.montantGarantie,
        declartionPrecedente: formValues.declartionPrecedente,
        motif: formValues.motif,
        autorisation: "4",
        motifArret: "ddp",
        quantiteQCS: formValues.quantiteQCS,
        poidsNet: formValues.poidsNet,
        valeurDeviseEtrangere: formValues.valeurDeviseEtrangere,
        valeurDT: formValues.valeurDT,
        
      });
      console.log("formValues.numchassis",formValues.numchassis)
        const demandeData: DemandeDto = new DemandeDto(formData); 
        this.autorisationService.sendFormData(demandeData).subscribe({
          next: (response: any) => {
            console.log('Success!', response);
            this.toastr.success('Demande soumise avec succès!');
            if (Object.keys(this.files).length > 0) {
              // this.onDocumentsUpload(response.demandeId, this.files);
            }
          },
          error: (error: any) => {
            console.log(demandeData);
            
            if (error.status === 400) {
              console.log(formData);
              
              this.toastr.error('Compléter le formulaire correctement');
            } else {
              this.toastr.error('Erreur lors de l’envoi des données',error.error.error);
            }
            console.error('Erreur lors de l’envoi des données', error);
          }
    })}
    
    // onDocumentsUpload(id: number, documents: {[key: string]: File}) {
    //   this.documentUploadService.addPhotos(id, documents).subscribe({
    //     next: response => console.log(response),
    //     error: error => console.error('Error uploading documents', error)
    //   });
    // }
  
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
              autorisation: "3",
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
  return "Saisissez votre CIN ou votre  numero de passeport";
}

getPlaceholder4(): string {
  return " 4  ";
}

getPlaceholder5(): string {
  return "Cette date doit être comprise entre la date d'expiration, qui est égale à la date de la décision + P, où P = 365 jours + (nombre de jours entre la date d'enregistrement de la déclaration de dédouanement du véhicule en question et la date de la décision).";
}

  getPlaceholder6(): string {
    return "Votre message ici6";
  }
  getPlaceholder7(): string {
    return "Ce champ doit être renseigné obligatoirement en cas d'arrêt manuel de l'autorisation ";
  }
  getPlaceholder8(): string {
    return "Votre message ici8";
  }
  getPlaceholder9(): string {
    return "Saisissez votre immatriculation";
}

  getPlaceholder12(): string {
    return "Votre message ici 10";
  }   
  getPlaceholder11(): string {
    return "Votre message ici 11";
  }  
  getPlaceholder10(): string {
    return "Choisissez votre  destination ";
}

  getPlaceholder13(): string {
    return "Choisissez votre nationalité";
  }  
  getPlaceholder14(): string {
    return "Saisissez 14";
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
  getPlaceholder(): string {
    return "Choisissez votre nationalité";
  } 
  getPlaceholder0(): string {
    return "Choisissez votre nationalité";
  }
}

  

