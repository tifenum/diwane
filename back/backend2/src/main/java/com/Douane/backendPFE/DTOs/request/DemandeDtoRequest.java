package com.Douane.backendPFE.DTOs.request;

import com.Douane.backendPFE.models.demandeAutorisation.enums.*;
import com.Douane.backendPFE.models.vehiculle.Marque;

public class DemandeDtoRequest {
    private String typeDemande;
    private Long codeDemande;
    private String expirationAt;
    private BrRattachement brRattachement;
    private BrFrontalier brFrontalier;
    private String info;
    private Pays paysOrigine;
    private Pays nationalite;
    private String motif;
    private String autorisation;
    private Long idBureauAutorite;
    private String numchassis;
    private String numImmatriculation;
    private Marque marque;
    private String complementMarque;
    private Double quantiteQCS;
    private Double poidsNet;
    private Double valeurDeviseEtrangere;
    private Double valeurDT;
    private String motifArret;
    private String description;
    private String interdictionsEtRestrictions;
    private String guaranteeReferenceNumber;
    private String nom;
    private String prenom;
    private String cinCarteSejour;
    private float montantGarantie;
    private String declartionPrecedente;
    private String echianceDate;

    // Getters and Setters
    public String getTypeDemande() {
        return typeDemande;
    }

    public void setTypeDemande(String typeDemande) {
        this.typeDemande = typeDemande;
    }

    public Long getCodeDemande() {
        return codeDemande;
    }

    public void setCodeDemande(Long codeDemande) {
        this.codeDemande = codeDemande;
    }

    public String getExpirationAt() {
        return expirationAt;
    }

    public void setExpirationAt(String expirationAt) {
        this.expirationAt = expirationAt;
    }

    public BrRattachement getBrRattachement() {
        return brRattachement;
    }

    public void setBrRattachement(BrRattachement brRattachement) {
        this.brRattachement = brRattachement;
    }

    public BrFrontalier getBrFrontalier() {
        return brFrontalier;
    }

    public void setBrFrontalier(BrFrontalier brFrontalier) {
        this.brFrontalier = brFrontalier;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Pays getPaysOrigine() {
        return paysOrigine;
    }

    public void setPaysOrigine(Pays paysOrigine) {
        this.paysOrigine = paysOrigine;
    }

    public Pays getNationalite() {
        return nationalite;
    }

    public void setNationalite(Pays nationalite) {
        this.nationalite = nationalite;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public String getAutorisation() {
        return autorisation;
    }

    public void setAutorisation(String autorisation) {
        this.autorisation = autorisation;
    }

    public Long getIdBureauAutorite() {
        return idBureauAutorite;
    }

    public void setIdBureauAutorite(Long idBureauAutorite) {
        this.idBureauAutorite = idBureauAutorite;
    }

    public String getNumchassis() {
        return numchassis;
    }

    public void setNumchassis(String numchassis) {
        this.numchassis = numchassis;
    }

    public String getNumImmatriculation() {
        return numImmatriculation;
    }

    public void setNumImmatriculation(String numImmatriculation) {
        this.numImmatriculation = numImmatriculation;
    }

    public Marque getMarque() {
        return marque;
    }

    public void setMarque(Marque marque) {
        this.marque = marque;
    }

    public String getComplementMarque() {
        return complementMarque;
    }

    public void setComplementMarque(String complementMarque) {
        this.complementMarque = complementMarque;
    }

    public Double getQuantiteQCS() {
        return quantiteQCS;
    }

    public void setQuantiteQCS(Double quantiteQCS) {
        this.quantiteQCS = quantiteQCS;
    }

    public Double getPoidsNet() {
        return poidsNet;
    }

    public void setPoidsNet(Double poidsNet) {
        this.poidsNet = poidsNet;
    }

    public Double getValeurDeviseEtrangere() {
        return valeurDeviseEtrangere;
    }

    public void setValeurDeviseEtrangere(Double valeurDeviseEtrangere) {
        this.valeurDeviseEtrangere = valeurDeviseEtrangere;
    }

    public Double getValeurDT() {
        return valeurDT;
    }

    public void setValeurDT(Double valeurDT) {
        this.valeurDT = valeurDT;
    }

    public String getMotifArret() {
        return motifArret;
    }

    public void setMotifArret(String motifArret) {
        this.motifArret = motifArret;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInterdictionsEtRestrictions() {
        return interdictionsEtRestrictions;
    }

    public void setInterdictionsEtRestrictions(String interdictionsEtRestrictions) {
        this.interdictionsEtRestrictions = interdictionsEtRestrictions;
    }

    public String getGuaranteeReferenceNumber() {
        return guaranteeReferenceNumber;
    }

    public void setGuaranteeReferenceNumber(String guaranteeReferenceNumber) {
        this.guaranteeReferenceNumber = guaranteeReferenceNumber;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getCinCarteSejour() {
        return cinCarteSejour;
    }

    public void setCinCarteSejour(String cinCarteSejour) {
        this.cinCarteSejour = cinCarteSejour;
    }

    public float getMontantGarantie() {
        return montantGarantie;
    }

    public void setMontantGarantie(float montantGarantie) {
        this.montantGarantie = montantGarantie;
    }

    public String getDeclartionPrecedente() {
        return declartionPrecedente;
    }

    public void setDeclartionPrecedente(String declartionPrecedente) {
        this.declartionPrecedente = declartionPrecedente;
    }

    public String getEchianceDate() {
        return echianceDate;
    }

    public void setEchianceDate(String echianceDate) {
        this.echianceDate = echianceDate;
    }
}
