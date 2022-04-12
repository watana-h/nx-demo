/**
 * @name alert-dialog.component
 * @description 共通アラートダイアログ
*/
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'nx-demo-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  title = "";
  message = "";
  cancelButtonText = "Cancel";

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: 
      { title: string,
        message: string, 
        buttonText: {cancel: string} },
    private dialogRef: MatDialogRef<AlertDialogComponent>) {
    if (data) {
      this.title = data.title || this.title;
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    // this.dialogRef.updateSize('300vw','300vw')
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
