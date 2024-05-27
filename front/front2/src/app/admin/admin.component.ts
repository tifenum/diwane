import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'})

export class AdminComponent {
  questions: any[] = [];
  newQuestion: any = { text: '', answer: '' };
  editIndex: number | null = null;

  constructor(private questionService: QuestionService,private router:Router) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(
      questions => this.questions = questions,
      error => console.error('Error loading questions:', error)
    );
  }

  addOrUpdateQuestion(): void {
    if (this.editIndex !== null) {
      this.questionService.updateQuestion(this.questions[this.editIndex])
        .subscribe(() => {
          this.loadQuestions();
          this.resetForm();
        });
    } else {
      this.questionService.addQuestion(this.newQuestion)
        .subscribe(() => {
          this.loadQuestions();
          this.resetForm();
        });
    }
  }

  editQuestion(index: number): void {
    this.newQuestion = { ...this.questions[index] };
    this.editIndex = index;
  }

  deleteQuestion(index: number): void {
    this.questionService.deleteQuestion(this.questions[index].id)
      .subscribe(() => this.loadQuestions());
  }

  resetForm(): void {
    this.newQuestion = { text: '', answer: '' };
    this.editIndex = null;
  }
  logout() {
    // Redirige vers la page "Home"
    this.router.navigate(['/home']);
  }

ajoutbureau() {
  // Redirige vers la page "Home"
  this.router.navigate(['/ajoutbureau']);
}
}
