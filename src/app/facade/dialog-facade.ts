import { inject, Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRechtlichesComponent } from '../components/dialog-anzeige/dialog-anzeige-component';
import { filter, map, Observable, of, pipe } from 'rxjs';
import { SettingsModel } from '../service/settings/settings-mode';
import {
  DialogSettingsComponent,
  DialogSettingsInput,
  DialogSettingsOutput,
} from '../components/dialog-settings/dialog-settings-component';

@Injectable({ providedIn: 'root' })
export class DialogFacade {
  private readonly m_Dialog = inject(MatDialog);

  openFehlerDialog(fehlercontent: string): void {
    this.m_Dialog.open(DialogRechtlichesComponent, {
      disableClose: true,
      data: {
        titel: 'Fehler bei der Eingabe!',
        datacontent: fehlercontent,
        isHtmlSicher: false,
      },
    });
  }

  openModalDialogMitHtml(titel: string, inhalt: string) {
    this.m_Dialog.open(DialogRechtlichesComponent, {
      disableClose: true,
      data: {
        titel: titel,
        datacontent: inhalt,
        isHtmlSicher: true,
      },
    });
  }

  openSettingsDialog(settings: SettingsModel): Observable<SettingsModel | null> {
    const dialogRef = this.m_Dialog.open<
      DialogSettingsComponent,
      DialogSettingsInput,
      DialogSettingsOutput
    >(DialogSettingsComponent, {
      data: {  isRightToLeft: settings.isRightToLeft },
      width: '500px',
      height: '200px',
      disableClose: true,
    });

    const toResult = (result: DialogSettingsOutput): SettingsModel | null => {
      if (result.isCancelled)
        return null;
      return {
        isRightToLeft: result.isRightToLeft,
      };
    };

    return dialogRef.afterClosed().pipe(
      filter((result) => result !== undefined),
      map((x) => {
        return toResult(x);
      })
    );
  }
}
