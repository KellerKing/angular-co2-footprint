import { Component, inject } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { SettingsService } from '../../../../service/settings.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-dialog-einstellungen',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
  ],
  templateUrl: './dialog-einstellungen.html',
  styleUrl: './dialog-einstellungen.css',
})
export class DialogEinstellungen {
  private readonly m_EinstellungenService = inject(SettingsService);
  private readonly dialogRef = inject(MatDialogRef<DialogEinstellungen>);

  m_AusrichtungenViewModel: AusrichtungViewModel[] = [
    {
      isLtr: true,
      displayText: 'Links nach Rechts',
      isSelected: !this.m_EinstellungenService.isRtl(),
    },
    {
      isLtr: false,
      displayText: 'Rechts nach Links',
      isSelected: this.m_EinstellungenService.isRtl(),
    },
  ];

  selectedAusrichtung =
    this.m_AusrichtungenViewModel.find((model) => model.isSelected) || this.m_AusrichtungenViewModel[0];

  onAbbrechen(): void {
    this.dialogRef.close();
  }

  onEinstellungenUebernehmen(): void {
    const isRtl = this.selectedAusrichtung.isLtr === false;
    this.m_EinstellungenService.setRlt(isRtl);
    this.dialogRef.close();
  }
}

interface AusrichtungViewModel {
  isLtr: boolean;
  displayText: string;
  isSelected: boolean;
}
