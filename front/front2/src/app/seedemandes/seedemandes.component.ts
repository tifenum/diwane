import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DemandeService } from '../service/autorisation/demande.service';
import { TokenStorageService } from '../service/token-storage.service';
@Component({
  selector: 'app-seedemandes',
  templateUrl: './seedemandes.component.html',
  styleUrl: './seedemandes.component.css'
})
export class SeedemandesComponent {
  forms: any[] = [];
  constructor(      
    public tokenService : TokenStorageService,
    private router:Router,
    private demandeService :DemandeService
    ){}

ngOnInit(): void {
    this.getAllForm()
}
getAllForm():void{
this.demandeService.getallForm().subscribe({
  next:(data)=>{
    this.forms=data;
    console.log("alll forms ",data);
  },error:(err)=>{
    console.log('error loading Form',err);
    
  }
})
    }
  goToCompte() :void{
    this.router.navigateByUrl("/compte")
  }
  logout() :void {
    this.tokenService.signOut();
    this.router.navigateByUrl("/home");
  }

  navigateToupdateForm(auto: string, id: string) {
    if (auto === "VH0100") {
      this.router.navigateByUrl(`/see1/${id}`);
    } else if (auto === "VH0200") {
      this.router.navigateByUrl(`/see2/${id}`);
    } else if (auto === "VH0300") {
      this.router.navigateByUrl(`/see3/${id}`);
    } else if (auto === "VH0400") {
      this.router.navigateByUrl(`/see4/${id}`);
    }
  }
}
