import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEinstellungen } from './dialog-einstellungen';

describe('DialogEinstellungen', () => {
  let component: DialogEinstellungen;
  let fixture: ComponentFixture<DialogEinstellungen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEinstellungen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEinstellungen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
