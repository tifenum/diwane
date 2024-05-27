package com.Douane.backendPFE.controllers;

import com.Douane.backendPFE.models.bureau.Bureau;
import com.Douane.backendPFE.models.demandeAutorisation.enums.Statue;
import com.Douane.backendPFE.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/count/all")
    public ResponseEntity<Long> countAllDemandes() {
        return ResponseEntity.ok(dashboardService.countAllDemandes());
    }

    @GetMapping("/count/statue/{statue}")
    public ResponseEntity<Long> countDemandesByStatue(@PathVariable Statue statue) {
        return ResponseEntity.ok(dashboardService.countDemandesByStatue(statue));
    }

    @GetMapping("/count/bureau/{bureauId}")
    public ResponseEntity<Long> countDemandesByBureau(@PathVariable Long bureauId) {
        Bureau bureau = new Bureau();
        bureau.setId(bureauId);
        return ResponseEntity.ok(dashboardService.countDemandesByBureau(bureau));
    }

    // Ajoutez d'autres endpoints selon vos besoins
}
