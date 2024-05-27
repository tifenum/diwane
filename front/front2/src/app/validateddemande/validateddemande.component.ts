// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ChefBRService } from '../service/bureau/chef-br.service';
// import { Demandee } from '../models/demandee';

// import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';

// @Component({
//   selector: 'app-validated-demande',
//   templateUrl: './validated-demande.component.html',
//   styleUrls: ['./validated-demande.component.css']
// })
// export class ValidatedDemandeComponent implements OnInit {
//   demande: Demandee;
//   qrCodeValue: string;

//   constructor(private demandeService: ChefBRService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     const idParam = this.route.snapshot.paramMap.get('id');
//     if (idParam !== null) {
//       const id = +idParam;
//       this.demandeService.validerDemande({ id, statue: 'VALID', archive: false }).subscribe(
//         (data: Demandee) => {
//           this.demande = data;
//         },
//         error => {
//           console.error(error);
//         }
//       );
//     } else {
//       console.error('ID param is null');
//     }
//   }

//   validateDemande(id: number) {
//     this.demandeService.validerDemande({ id, statue: 'VALID', archive: false }).subscribe(
//       (data: Demandee) => {
//         this.demande = data;
//         this.qrCodeValue = JSON.stringify(data);
//       },
//       error => {
//         console.error('Erreur lors de la validation de la demande', error);
//       }
//     );
//   }

//   downloadAsCSV() {
//     const worksheet = XLSX.utils.json_to_sheet([this.demande]);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Demande');
//     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, 'Demande_Validée');
//   }

//   saveAsExcelFile(buffer: any, fileName: string): void {
//     const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
//     FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
//   }
// }

