package com.Douane.backendPFE.services;

import com.Douane.backendPFE.models.bureau.Bureau;
import com.Douane.backendPFE.models.demandeAutorisation.enums.Statue;
import com.Douane.backendPFE.repositories.autoritationR.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private DemandeRepository demandeRepository;

    public long countAllDemandes() {
        return demandeRepository.count();
    }

    public long countDemandesByStatue(Statue statue) {
        return demandeRepository.countByStatueDem(statue);
    }

    public long countDemandesByBureau(Bureau bureau) {
        return demandeRepository.countByBureauAutorite(bureau);
    }

    // Ajoutez d'autres méthodes de comptage selon vos besoins
}
