package com.Douane.backendPFE.models.demandeAutorisation;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@Builder
public class ModeDapurement {
    private Double quantiteQCS;
    private Double poidsNet;
    private Double valeurDeviseEtrangere;
    private Double valeurDT;
}
