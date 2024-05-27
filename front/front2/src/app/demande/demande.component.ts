import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectateurService } from '../service/bureau/inspectateur.service';
import { Demandee } from '../models/demandee';
import { ToastrService } from 'ngx-toastr';
import { DocumentUploadService } from '../service/document-upload.service';
import { DemandeVerify } from '../models/demandeverify';
import { EmailService } from '../email.service';
import { UserService } from '../service/profil/user.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  demandes: Demandee | null = null;
  id: number;
  userId: number;
  email: string;

  constructor(
    private usr: UserService,
    private mailjetService: EmailService,
    private activeroute: ActivatedRoute,
    private demandeService: InspectateurService,
    private toastr: ToastrService,
    private documentUploadService: DocumentUploadService,
    private inspecteurService: InspectateurService,
    private router: Router ,// Inject Router

  ) {}

  ngOnInit(): void {
    this.id = this.activeroute.snapshot.params['id'];
    this.loadDemande();
    this.sendEmail("fea");
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

  loadDemande(): void {
    this.demandeService.getDemandeById(this.id).subscribe({
      next: (data: any) => {
        this.userId = data.createUser.id;
        this.demandes = data;
        this.email = data.createUser.email; // Set the email globally
        console.log('Demande by ID:', this.demandes);
      },
      error: (error) => {
        console.error('Error fetching the demande:', error);
        this.toastr.error('Une erreur est survenue lors de la récupération de la demande.');
      }
    });
  }

  delete(id: number): void {
    this.inspecteurService.deleteDemande(id).subscribe({
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
        <h1>votre demande a ete supprimer</h1>
          <div class="container">
            <img src="http://cdn.mcauto-images-production.sendgrid.net/8c04fc1a6d6b4ca3/365ba7f1-1205-48a5-bfe3-cecf5e129f38/1920x750.jpg"
              alt="Banner Image">
            <p>Click the button below to login:</p>
            <a href="http://localhost:4200" class="button">Login</a>
            <p style="font-size: 12px;">You're receiving this email because you signed up for updates from our website. If you wish to unsubscribe, click the button above.</p>
          </div>
        </body>
        
        </html>`); // Use the globally stored email
        console.log('Demande deleted successfully');
        this.toastr.success('La demande a été supprimée avec succès!', 'Succès');
        this.router.navigate(['/inspecteur']);
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
    this.inspecteurService.verifyDemand(demandeVerifieDto).subscribe({
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
        <h1>votre demande a ete verifier</h1>
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
        this.router.navigateByUrl("/inspecteur");
      },
      error: (error) => {
        console.error('Erreur lors de la vérification:', error);
      }
    });
  }
}
