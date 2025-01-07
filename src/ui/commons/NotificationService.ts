import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogDto } from '../../domain/common/dto/ConfirmDialogDto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);

  async openConfirmDialog(message: string): Promise<boolean> {
    const prom = new Promise<boolean>(async (resolve, reject) => {
      const Dialog = (
        await import(
          '../standalone/common/confirm-dialog/confirm-dialog.component'
        )
      ).ConfirmDialogComponent;
      const dataDialog: ConfirmDialogDto = { message };
      const dialogRef = this._dialog.open(Dialog, { data: dataDialog });
      dialogRef.afterClosed().subscribe((result) => {
        if (typeof result === 'boolean') {
          resolve(result);
          return;
        } else {
          reject(Error('unknown response from confirm dialog'));
          return;
        }
      });
    });

    return prom;
  }

  public showSnackBar(msg: string, label: string) {
    this._snackBar.open(msg, label, { duration: 3000 });
  }
}
