/**
 * @name confirm-dialog.component
 * @description 共通確認ダイアログ
*/
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'nx-demo-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  title = "";
  message = "";
  okButtonText = "Ok";
  cancelButtonText = "Cancel";

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:
      { title: string,
        message: string,
        buttonText: {ok: string, cancel: string} },
    private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    if (data) {
      // 条件分岐省略
      // if (hoge) { bar = hoge; } else { bar = 'empty'; }
      // ↓
      // bar = hoge || 'empty';

      this.title = data.title || this.title;
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.okButtonText = data.buttonText.ok || this.okButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    // this.dialogRef.updateSize('300vw','300vw')
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
