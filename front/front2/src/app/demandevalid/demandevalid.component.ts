import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectateurService } from '../service/bureau/inspectateur.service';
import { Demandee } from '../models/demandee';
import { ToastrService } from 'ngx-toastr';
import { DocumentUploadService } from '../service/document-upload.service';
import { DemandeVerify } from '../models/demandeverify';
import { ChefBRService } from '../service/bureau/chef-br.service';
import { EmailService } from '../email.service';
@Component({
  selector: 'app-demandevalid',
  templateUrl: './demandevalid.component.html',
  styleUrls: ['./demandevalid.component.css']
})
export class DemandevalidComponent implements OnInit {
  demandes: any;
  id: number;
  email: string;
  qrCodeBase64: string; // Variable to store base64 encoded QR code

  constructor(
    private activeroute: ActivatedRoute,
    private demandeService: InspectateurService,
    private toastr: ToastrService,
    private documentUploadService: DocumentUploadService,
    private chefService: ChefBRService,
    private router: Router ,// Inject Router
    private mailjetService :EmailService
  ) {}

  ngOnInit(): void {
    this.id = this.activeroute.snapshot.params['id'];
    this.loadDemande();
  }

  loadDemande(): void {
    this.demandeService.getChefDemandeById(this.id).subscribe({
      next: (data: any) => {
        this.demandes = data;
        this.email=this.demandes.createUser.email;
        console.log('demandebyid', this.demandes);
      },
      error: (error) => {
        console.error('Error fetching the demande:', error);
        this.toastr.error('Une erreur est survenue lors de la récupération de la demande.'); 
      }
    });
  }
  sendEmail(content: string): void {
    const subject = 'Conseranat votre demande';
    this.mailjetService.sendEmail(this.email, subject, content)
      .toPromise()
      .then(() => {
        console.log('Email sent successfully');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }
  delete(id: number): void {
    this.chefService.deleteDemande(id).subscribe({
      next: () => {
        const qrCodeUrl = `http://localhost:4200`;
        this.sendEmail(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
        
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        
            img {
              max-width: 100%;
              height: auto;
              display: block;
              margin: 0 auto;
            }
        
            p {
              font-size: 16px;
              line-height: 1.6;
              margin: 15px 0;
            }
        
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
        
            .button:hover {
              background-color: #0056b3;
            }
        
            @media screen and (max-width: 600px) {
              .container {
                padding: 10px;
              }
        
              p {
                font-size: 14px;
              }
            }
          </style>
        </head>
        <body>
        <h1>votre demande a été supprimée</h1>
        <div class="container">
          <img src="http://cdn.mcauto-images-production.sendgrid.net/8c04fc1a6d6b4ca3/365ba7f1-1205-48a5-bfe3-cecf5e129f38/1920x750.jpg"
               alt="Banner Image">
          <!-- New image -->
          <p>Click the button below to login:</p>
          <a href="http://localhost:4200" class="button">Login</a>
          <p style="font-size: 12px;">You're receiving this email because you signed up for updates from our website. If you wish to unsubscribe, click the button above.</p>
        </div>
        </body>
        </html>`);
        console.log('Demande deleted successfully');
        this.toastr.success('Le demande a été supprimé avec succès!', 'Succès');
        this.router.navigate(['/chef']); // Navigate using router
      },
      error: (error) => {
        console.error('Error deleting demande:', error.message);
      }
    });
  }

  verifyDemand(id: number, statue: string, archive: boolean): void {
    if (id === -1) {
      console.error('ID invalide, opération annulée');
      return;
    }
    const demandeVerifieDto: DemandeVerify = new DemandeVerify(statue, id, archive);
    this.chefService.validerDemande(demandeVerifieDto).subscribe({
      next: (response) => {
        const qrCodeUrl = `http://localhost:4200`;

        this.sendEmail(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
        
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        
            img {
              max-width: 100%;
              height: auto;
              display: block;
              margin: 0 auto;
            }
        
            p {
              font-size: 16px;
              line-height: 1.6;
              margin: 15px 0;
            }
        
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
        
            .button:hover {
              background-color: #0056b3;
            }
        
            @media screen and (max-width: 600px) {
              .container {
                padding: 10px;
              }
        
              p {
                font-size: 14px;
              }
            }
          </style>
        </head>
        
        <body>
        <h1>votre demande a ete valider</h1>
          <div class="container">
            <img src="http://cdn.mcauto-images-production.sendgrid.net/8c04fc1a6d6b4ca3/365ba7f1-1205-48a5-bfe3-cecf5e129f38/1920x750.jpg"
              alt="Banner Image">
            <p>Click the button below to login:</p>
            <a href="http://localhost:4200" class="button">Login</a>
            <p style="font-size: 12px;">You're receiving this email because you signed up for updates from our website. If you wish to unsubscribe, click the button above.</p>
          </div>
        </body>
        
        </html>`);
        console.log('Demande vérifiée avec succès:', response);
        this.router.navigateByUrl("/chef");
      },
      error: (error) => {
        console.error('Erreur lors de la vérification:', error);
      }
    });
  }
}
