import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-status-check',
  template: `
    <h1 mat-dialog-title>Status</h1>
    <div mat-dialog-content>{{data.message}}</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `
})
export class StatusCheckComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
}
