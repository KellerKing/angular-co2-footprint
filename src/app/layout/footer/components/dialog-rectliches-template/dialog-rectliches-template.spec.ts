import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRectlichesTemplate } from './dialog-rectliches-template';

describe('DialogRectlichesComponent', () => {
  let component: DialogRectlichesTemplate;
  let fixture: ComponentFixture<DialogRectlichesTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRectlichesTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRectlichesTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
