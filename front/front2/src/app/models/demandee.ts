export interface Demandee {

    id: number;
    type: string;
    NumRef: string;
    cinUrl: string;
    passportUrl: string;
    carteGriseUrl: string;
    assuranceUrl: string;
    justPossessionUrl: string;
    autrJustUrl: string;
    docTaxeCirculationUrl: string;
    docPlaqueImmatriculation: string;
    docContratAssurance: string;
    desiDemande: string;
    codeDemande: number;
    createdAt: string;
    expirationAt: string;
    brRattachement:String;
    brFrontalier:String;
    idfMarchandises: boolean;
    etatReserve: string[];
    info: string;
    paysOrigine: string;
    nationalite: string;
    motif: string;
    numDiptyque: string;
    autorisation:String;
    statueDem: string;
    numchassis: string;
    numImmatriculation: string;
    marque: string;
    motifArret: string;
    quantiteQCS:number;
    poidsNet:number;
    valeurDeviseEtrangere:number;
    valeurDT:number;
    description: string;
    interdictionsEtRestrictions: string;
    guaranteeReferenceNumber: string;
    montantGarantie: number;
    guaranteeDocumentUrl: string;
    nom:String;
    prenom:String;
    cinCarteSejour:String;
    declartionPrecedente: string;
    echianceDate: string;
    archiveAuto: boolean;

//    bureauAutoriteId : number; 
//     vehiculleId: number; 
//     createUserId: number;
//     verifyUserId: number;
//     validateUserId: number;
   
}
