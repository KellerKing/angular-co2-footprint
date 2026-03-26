import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelleComponent } from './tabelle-component';

describe('TabelleComponent', () => {
  let component: TabelleComponent;
  let fixture: ComponentFixture<TabelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelleComponent);
    fixture.componentRef.setInput('viewModels', []);

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset page size to 25 when data grows after a small result set', async () => {
    fixture.componentRef.setInput('viewModels', createViewModels(5));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.m_DataSource.paginator?.pageSize).toBe(5);

    fixture.componentRef.setInput('viewModels', createViewModels(30));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.m_DataSource.paginator?.pageSize).toBe(25);
  });
});

function createViewModels(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    land: `Land ${index + 1}`,
    firma: `Firma ${index + 1}`,
    emissionen: index,
  }));
}
