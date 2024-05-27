import {  Component,    OnInit,   } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../service/token-storage.service';
import { AuthLoginInfo } from '../models/authLoginInfo';
import { JwtResponse } from '../models/jwt-response';
import { SignupRequest } from '../models/signupRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userrequest: SignupRequest ;
  registerForm !: FormGroup;

  private loginInfo?: AuthLoginInfo;

  registrationMessage: string = '';
  
  formLogin = new FormGroup ({
    email: new FormControl(),
    password: new FormControl(),
  })

  constructor(
    public authService: AuthService,
    public tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private router: Router,
    
    private fb: FormBuilder  // FormBuilder pour construire le formulaire
  ) {}

  ngOnInit(): void {
   
    this.registerForm = this.fb.group({
      firstname : ['',Validators.required],
      lastname : ['',Validators.required],
      email : ['',Validators.email],
      password :['',Validators.required]
});  
  }
  



  register(): void {
    const newUser : SignupRequest = this.registerForm.value;
   
    if (newUser) {

      this.authService.register(newUser).subscribe({
        next: (response) => {
          this.toastr.success('Utilisateur enregistré avec succès !');
          
          
        },
        error: (error) => {
          this.toastr.error('Erreur lors de l\'enregistrement.', error);
        }
      });
    } else {
      this.toastr.error('Veuillez remplir tous les champs correctement.');
    }
  }


  get f() { return this.formLogin.controls; }
  login(): void {
    if (this.formLogin.valid) {  
      this.loginInfo = new AuthLoginInfo(
        this.formLogin.get('email')?.value,
        this.formLogin.get('password')?.value
      );
 console.log( 'errur',this.formLogin)
      this.authService.attemptAuth(this.loginInfo).subscribe(
        (data:JwtResponse )=> {
          if (data.token !== undefined && data.roles !== undefined) {
           
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveAuthorities(data.roles);
           
            console.log ( "erreur",this.loginInfo)
            
            this.redirectUser(data.roles)
           // window.location.reload();
            this.toastr.success('Connexion réussie !');
          } else {
            this.toastr.error('Erreur lors de la connexion.');
          }
        },
        error => {
          console.error('Erreur lors de la connexion', error);
          this.toastr.error('Échec de la connexion.');
        }
      );
    }

  }
  redirectUser(roles:String[]){
    if (roles.includes("ROLE_ADMIN")) {
      this.router.navigateByUrl('/admin');
    } else if (roles.includes("ROLE_INSPECTATEURBR")) {
      this.router.navigateByUrl('/inspecteur');
    } else if (roles.includes("ROLE_CITOYEN")) {
      this.router.navigateByUrl('/compte');
    } else if (roles.includes("ROLE_CHEF_BUREAU")) {
      this.router.navigateByUrl('/chef');
    } else {
      this.router.navigateByUrl("/home");
    }
  }
 
    logout() :void {
      this.tokenStorage.signOut();
    }
  
   


  sendResetPasswordRequest(){}
  updatePassword(){}
  
  }
  

