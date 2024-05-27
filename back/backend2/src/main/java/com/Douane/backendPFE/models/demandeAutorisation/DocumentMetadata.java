package com.Douane.backendPFE.models.demandeAutorisation;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class DocumentMetadata {
    private String cinUrl;
    private String passportUrl;
    private String carteGriseUrl;
    private String assuranceUrl;
    private String justPossessionUrl;
    private String autrJustUrl;

    //document insertion Reserves Interdictions et restrictions lor de type de demande est RENOUVELLEMENT

    private String docTaxeCirculationUrl;
    private String docPlaqueImmatriculation;
    private String docContratAssurance;

}
