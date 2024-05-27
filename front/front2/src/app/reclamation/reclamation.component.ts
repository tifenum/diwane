import { Component } from '@angular/core';
import { ContService } from '../service/contact/cont.service';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from '../models/reclamation';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent {
  users: Reclamation[] = [];
  constructor(private contactService: ContService,private toastr :ToastrService) {}
  ngOnInit(): void {
    this.getAllrec();

  }

  getAllrec(): void {
    this.contactService.getAllMessages().subscribe(
      (data) => { 
        this.users=data
        console.log("user",data)
       }
    );
  }
 
}
