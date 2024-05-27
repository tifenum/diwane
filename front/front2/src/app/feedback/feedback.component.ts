import { Component } from '@angular/core';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackText = '';

  constructor(private feedbackService: FeedbackService) { }

  onSubmit(): void {
    this.feedbackService.sendFeedback(this.feedbackText).subscribe({
      next: (response) => {
        console.log('Feedback sent successfully', response);
        this.feedbackText = ''; // Reset textarea after submission
      },
      error: (err) => {
        console.error('Error sending feedback', err);
      }
    });
  }
}
