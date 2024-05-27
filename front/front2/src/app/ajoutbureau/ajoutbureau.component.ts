import { Component, OnInit } from '@angular/core';
import { Bureaudto } from '../models/bureaudto';
import { BureauService } from '../service/admin/bureau.service';
import { TacheBureauService } from '../service/bureau/tache-bureau.service';
import { TacheBureau } from '../models/tache-bureau';
import { Bureau } from '../models/bureau';
import { User } from '../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajoutbureau',
  templateUrl: './ajoutbureau.component.html',
  styleUrls: ['./ajoutbureau.component.css']
})
export class AjoutbureauComponent implements OnInit {
  bureaudto: Bureaudto = {
    name: '',
    taches: []
  };
  bureaux: Bureau[];
  bureauId: number;
  tacheId: number;
  user: User[];
  users: User = new User()
  ajoutbureau: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    roles: new FormControl(''),
    // idBureau: new FormControl(''),
    
  });;
  userss: any;
  selectedRole: string;
  rolle: any;

  constructor(private toastr: ToastrService, private bureauService: BureauService, private tacheBureauService: TacheBureauService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getRole();
    this.getBureaux();

    this.ajoutbureau = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
     // idBureau: ['', Validators.required],
    })
  }
  onSubmit() {
   
    console.log("response", this.ajoutbureau)
    this.bureauService.createEmployer(this.ajoutbureau.value).subscribe((
       response:any) => {
        console.log('Employé créé avec succès:', response);
        this.toastr.success('Employé créé avec succès!', 'Succès');
        this.ajoutbureau.reset();
      })
      // ,
      // error: (error) => {
      //   console.error('Échec de la création de l\'employé:', error);
      //   this.toastr.error('Erreur lors de la création de l\'employé', 'Erreur');
      // }

   
  }


  getBureaux() {
    this.bureauService.getAllBureaux().subscribe((response: any) => {
      this.bureaux = response;
      console.log("liste of bureau", this.bureaux)
    }, error => {
      console.error('Erreur lors de la récupération des bureaux', error);
    });
  }

  assignTache(): void {
    const tacheBureau = new TacheBureau(this.bureauId, this.tacheId);
    this.tacheBureauService.assignTache(tacheBureau).subscribe({
      next: (response) => {
        console.log('Tache assigned successfully to bureau', response);
      },
      error: (error) => {
        console.error('Error assigning tache to bureau', error);
      }
    });
  }
  getRole() {
    this.bureauService.getUsersBySpecificRoles().subscribe((res: any) => {
      this.rolle = res.filter((a: any) => a.name == "ROLE_INSPECTATEURBR" || a.name == "ROLE_CHEF_BUREAU")
      console.log("role", this.rolle)
    })
  }
}
