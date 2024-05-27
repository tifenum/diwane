import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import QRCode from 'qrcode';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
  formData: any;
  qrDataUrl: string = '';


  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Récupérer les données de formulaire depuis l'état du routeur lors de la navigation
    this.route.paramMap.subscribe(params => {
      // Assurez-vous que les données sont passées comme état de navigation dans le routeur
      this.formData = history.state.data;
    });

    // Ici, les données du formulaire devraient être définies
    if (this.formData) {
      // Générer le code QR
      QRCode.toDataURL(JSON.stringify(this.formData))
        .then(url => {
          this.qrDataUrl = url;
        })
        .catch(err => {
          console.error('Erreur lors de la génération du code QR:', err);
        });
    }
  }

  imprimerPage() {
    window.print();
  }
}
