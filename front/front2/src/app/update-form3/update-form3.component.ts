import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {DemandeService } from '../service/autorisation/demande.service';
import { ToastrService } from 'ngx-toastr';
import {DemandeDto} from'../models/demande';
import { DocumentUploadService } from '../service/document-upload.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-form3',
  templateUrl: './update-form3.component.html',
  styleUrl: './update-form3.component.css'
})
export class UpdateForm3Component implements OnInit {
  rsForm!: FormGroup;
  forms: any[] = [];
  id: string | null;
  constructor( private fb: FormBuilder, private autorisationService: DemandeService, private toastr: ToastrService, private datePipe: DatePipe, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getAllFormById()
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
   
   

     

      this.autorisationService.updateDemande(this.id , formData).subscribe({
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
  


    getAllFormById(): void {
      this.autorisationService.getallForm().subscribe({
        next: (data) => {
          const form = data.find((item: { id: string | null; }) => item.id == this.id);
          if (form) {
            this.forms = [form]; 
            console.log("Form with id ", this.id, ": ", form);
            console.log('this.forms[0].codeDemande',this.forms[0].vehiculle.numchassis);
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
              numchassis: [String(this.forms[0].vehiculle.numchassis), Validators.required],
              numImmatriculation: [this.forms[0].vehiculle.numImmatriculation, Validators.required],
              marque: [this.forms[0].vehiculle.marque, Validators.required],
              complementMarque: [this.forms[0].complementMarque, Validators.required],
              quantiteQCS: [this.forms[0].modeDapurement.quantiteQCS, Validators.required],
             poidsNet: [this.forms[0].modeDapurement.poidsNet, Validators.required],
             valeurDeviseEtrangere:[this.forms[0].modeDapurement.valeurDeviseEtrangere, Validators.required],
             valeurDT: [this.forms[0].modeDapurement.valeurDT, Validators.required],
              
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
}