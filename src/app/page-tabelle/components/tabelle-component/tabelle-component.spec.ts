import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelleComponent } from './tabelle-component';

describe('TabelleComponent', () => {
  let component: TabelleComponent;
  let fixture: ComponentFixture<TabelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
