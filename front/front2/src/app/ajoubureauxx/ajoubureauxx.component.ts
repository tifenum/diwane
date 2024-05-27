import { Component } from '@angular/core';
import { BureauService } from '../service/admin/bureau.service';
import {BureauDto} from '../models/bureau-dto';
import { ETache } from '../models/etache';



@Component({
  selector: 'app-ajoubureauxx',
  templateUrl: './ajoubureauxx.component.html',
  styleUrls: ['./ajoubureauxx.component.css']
})
export class AjoubureauxxComponent {
  bureauDto: BureauDto = {
    name: '',
    taches: new Set<string>()
  };
  tachesList = Object.values(ETache);

  constructor(private adminService:  BureauService) { }

  addTache(tache: string): void {
    this.bureauDto.taches.add(tache);
  }

  removeTache(tache: string): void {
    this.bureauDto.taches.delete(tache);
  }

  toggleTache(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.addTache(checkbox.value);
    } else {
      this.removeTache(checkbox.value);
    }
  }

  createBureau(): void {
    this.adminService.createBureau(this.bureauDto).subscribe(
      response => {
        console.log('Bureau created successfully:', response);
      },
      error => {
        console.error('There was an error creating the bureau:', error);
      }
    );
  }
}
