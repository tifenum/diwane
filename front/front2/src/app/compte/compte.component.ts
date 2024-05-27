import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DemandeService } from '../service/autorisation/demande.service';
import { StatusCheckComponent } from '../status-check/status-check.component';
import { UserService } from '../service/profil/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { QuestionService } from '../service/question.service';
import { User } from '../models/user';
import { UpdateUserDto } from '../models/update-user-dto';
import { Questions } from '../models/questions';



@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  user: User;
  update: FormGroup;
  selectedQuestion: Questions | null = null;
  userQuestion: string = '';

  constructor(
    private formb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    public tokenService: TokenStorageService,
    private chatService: QuestionService,
    private demandeService: DemandeService,
    private dialog: MatDialog
  ) {}

  questions: Questions[] = [
    { text: "Quelle est votre politique de retour ?", answer: "Vous pouvez retourner le produit dans les 30 jours." },
    { text: "Comment puis-je contacter le support ?", answer: "Vous pouvez nous contacter via email à support@example.com." },
    // Ajoutez d'autres questions ici
  ];

  selectQuestion(question: Questions): void {
    this.selectedQuestion = question;
  }

  ngOnInit(): void {
    if(this.tokenService.isLoggedIn()) {
      this.getUserProfile();
    }

    this.update = this.formb.group({
      firstname: [''],
      lastname: [''],
      password: ['']
      // photo: ['', Validators.required]
    });
  }

  getUserProfile(): void {
    this.userService.getProfile().subscribe((res) => {
      this.user = res;
      console.log("user.............", this.user);
      this.toastr.success('Profil chargé avec succès');
    });
  }

  submitQuestion(): void {
    if (this.userQuestion.trim()) {
      this.chatService.sendQuestion(this.userQuestion).subscribe({
        next: (response) => {
          // Handle response
        },
        error: (error) => {
          // Handle error
        }
      });
      this.userQuestion = ''; // Reset input field
    }
  }

  updateProfile(): void {
    const userUpdate: UpdateUserDto = this.update.value;

    this.userService.updateProfile(userUpdate).subscribe({
      next: (response) => {
        this.user = response;
        console.log('user update  : ' + this.user);
        this.toastr.success('Profil mis à jour avec succès');
      },
      error: (error) => {
        this.toastr.error('Erreur lors de la mise à jour du profil.', error);
      }
    });
  }

  goToCompte(): void {
    this.router.navigateByUrl("/compte");
  }

  logout(): void {
    this.tokenService.signOut();
    this.router.navigateByUrl("/home");
  }

  uploadProfilePhoto(event: any): void {
    const profilePhoto: File = event.target.files[0];
    if (profilePhoto) {
      this.userService.uploadPhoto(profilePhoto).subscribe({
        next: (response) => {
          console.log('error', response);
          this.toastr.success('Photo de profil téléchargée avec succès');
          this.user.profilePhoto = response;
        },
        error: (error) => {
          this.toastr.error('Erreur lors du téléchargement de la photo de profil');
        }
      });
    }
  }

  checkStatus(id: number): void {
    this.demandeService.getDemandeStatus(id).subscribe(
      data => {
        this.dialog.open( StatusCheckComponent , {
          data: { message: data.message }
        });
      },
      error => {
        this.dialog.open( StatusCheckComponent , {
          data: { message: 'Erreur lors de la récupération du statut' }
        });
      }
    );
  }
}
