export class DemandeDto {
  
  typeDemande: string;
  codeDemande: string;
  expirationAt: string;
  brRattachement:string ;
  brFrontalier:string ;
  info: string;
  paysOrigine:string ;
  nationalite:string ;
  motif: string;
  autorisation: string;


  numchassis: string;
  numImmatriculation: string;
  marque: string;
  complementMarque: string;

  quantiteQCS?: number;
  poidsNet?: number;
  valeurDeviseEtrangere?: number;
  valeurDT?: number;
  motifArret?: string;
  description?: string;
  interdictionsEtRestrictions?: string;
  guaranteeReferenceNumber?: string;
  nom?:String;
  prenom?:String;
  cinCarteSejour?: string;
  montantGarantie?: number;
  declartionPrecedente?: string;
  echianceDate?: string;

constructor(data?: Partial<DemandeDto>) {
  Object.assign(this, data);
}
}

