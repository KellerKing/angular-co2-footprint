import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEinstellungen } from './dialog-einstellungen.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('DialogEinstellungen', () => {
  let component: DialogEinstellungen;
  let fixture: ComponentFixture<DialogEinstellungen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEinstellungen],
       providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEinstellungen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Smoke Test: Komponente erstellbar', () => {
    expect(component).toBeTruthy();
  });
});
