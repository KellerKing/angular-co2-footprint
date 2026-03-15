import { Component, effect, inject, signal } from '@angular/core';
import { form,  FormField } from '@angular/forms/signals';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { SettingsService } from '../../../service/settings.service';

@Component({
  selector: 'app-dialog-einstellungen',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle, FormField],
  templateUrl: './dialog-einstellungen.html',
  styleUrl: './dialog-einstellungen.css',
})
export class DialogEinstellungen {
  private readonly m_EinstellungenService = inject(SettingsService);

  einstellungeModel = signal<EinstellungenDataModel>({
    isRtl: false,
  });

  einstellungenForm = form(this.einstellungeModel);

  constructor() {
    effect(() => {
      console.log("haskdjasd");
      this.einstellungeModel().isRtl = this.m_EinstellungenService.isRtl();
    });
  }
}

type EinstellungenDataModel = {
  isRtl: boolean;
};
