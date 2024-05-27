import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {DemandeService } from '../service/autorisation/demande.service';
import { ToastrService } from 'ngx-toastr';
import {DemandeDto} from'../models/demande';
import { DocumentUploadService } from '../service/document-upload.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
@Component({
  selector: 'app-autorisation3',
  templateUrl: './autorisation3.component.html',
  styleUrls: ['./autorisation3.component.css']
})
export class Autorisation3Component implements OnInit {
  rsForm!: FormGroup;

  constructor(public tokenService : TokenStorageService,private router:Router, private fb: FormBuilder, private autorisationService: DemandeService, private toastr: ToastrService, private datePipe: DatePipe,) {}

  ngOnInit(): void {
    this.rsForm = this.fb.group({
      typeDemande: ['', Validators.required],
      codeDemande: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      expirationAt: ['', Validators.required],
      brRattachement: ['', Validators.required],
      numchassis: ['', Validators.required],
      numImmatriculation: ['', [Validators.required, Validators.pattern('XX-123-XX')]],
      marque: ['', Validators.required],
      complementMarque: ['', Validators.required],
      interdictionsEtRestrictions: ['', Validators.required],
      info: [''],
      guaranteeReferenceNumber: ['', Validators.required],
      montantGarantie: ['', Validators.required],
      declartionPrecedente: ['', Validators.required],
      motif: ['', Validators.required],
      motifArret: ['', Validators.required],
      quantiteQCS: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      poidsNet: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      valeurDeviseEtrangere: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      valeurDT: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      garantieImage: [null],
      cinUrl: ['', Validators.required],
      docPlaqueImmatriculation: [''],
      docContratAssurance: [''],
      carteGriseUrl: [''],
      justPossessionUrl: [''],
      docTaxeCirculationUrl: [''],
      assuranceUrl: ['']
    }); }
   

  files: {[key: string]: File} = {};

  handleFileInput(files: FileList | null, key: string): void {
    if (files && files.length > 0) {
      this.files[key] = files[0];
    }
  }
  
  onSubmit(): void {
    const formValues = this.rsForm.value;
    const formattedExpirationDate = this.datePipe.transform(formValues.expirationAt, 'yyyy-MM-ddTHH:mm:ss');
    // if (!this.rsForm.valid) {
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
        guaranteeReferenceNumber: formValues.guaranteeReferenceNumber,
        montantGarantie: formValues.montantGarantie,
        declartionPrecedente: formValues.declartionPrecedente,
        motif: formValues.motif,
        autorisation: "3",
        motifArret: "ddp",
        quantiteQCS: formValues.quantiteQCS,
        poidsNet: formValues.poidsNet,
        valeurDeviseEtrangere: formValues.valeurDeviseEtrangere,
        valeurDT: formValues.valeurDT
      });

   console.log("formValues.numchassis ",formValues.numchassis);
   console.log("this.rsForm.value",this.rsForm.value);
   
   

     

      this.autorisationService.sendFormData(formData).subscribe({
        next: (response: any) => {
          console.log('Success!', response);
          this.toastr.success('Demande soumise avec succès!');
          if (Object.keys(this.files).length > 0) {
            // this.onDocumentsUpload(response.demandeId, this.files);
          }
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
    // } else {
    //   this.toastr.error('Formulaire invalide, veuillez vérifier les champs.');
    // }
  }

    
    // onDocumentsUpload(id: number, documents: {[key: string]: File}) {
    //   this.documentUploadService.addPhotos(id, documents).subscribe({
    //     next: response => console.log(response),
    //     error: error => console.error('Error uploading documents', error)
    //   });
    // }
  


 


  getPlaceholder(): string {
    return "Votre message ici";
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
  logout() :void {
    this.tokenService.signOut();
    this.router.navigateByUrl("/home");
  }
}