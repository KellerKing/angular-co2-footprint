import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTabelle } from './page-tabelle';

describe('PageTabelle', () => {
  let component: PageTabelle;
  let fixture: ComponentFixture<PageTabelle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTabelle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTabelle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
