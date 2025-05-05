import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  imports: [
    MatDialogClose,
    MatDialogActions,
    MatDialogContent
  ]
})
export class ConfirmDialogComponent {}
