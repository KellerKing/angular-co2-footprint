import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  DialogSettingsComponent,
  DialogSettingsInput,
  DialogSettingsOutput,
} from '../../components/dialog.settings/dialog.settings.component';

@Injectable({ providedIn: 'root' })
export class SettingsDialogService {
  constructor() {}

  private m_Dialog = inject(MatDialog);

  openSettingsDialog(isRightToLeft: boolean): Observable<DialogSettingsOutput> {
    const dialogRef = this.m_Dialog.open<
      DialogSettingsComponent,
      DialogSettingsInput,
      DialogSettingsOutput
    >(DialogSettingsComponent, {
      data: { isRightToLeft },
      width: '500px',
      height: '200px',
      disableClose: true,
    });

    return dialogRef.afterClosed().pipe(
      filter((result) => result !== undefined)
    );
  }
}
