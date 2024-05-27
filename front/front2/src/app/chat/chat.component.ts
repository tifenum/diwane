import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';

import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  questions: any[] = [];
  newQuestion: any = { text: '', answer: '' };
  editIndex: number | null = null;

  constructor(private questionService: QuestionService, private router:Router, public tokenService : TokenStorageService,) { }

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
 
  logout() :void {
    this.tokenService.signOut();
    this.router.navigateByUrl("/home");
  }}