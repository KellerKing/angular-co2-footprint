import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelleComponent } from './tabelle.component';

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

  it("PageSize bleibt unverändert wenn Daten aktualisiert werden und neue Ergebnismenge nicht kleiner als der gesetzte Wert ist", async () => {
    fixture.componentRef.setInput('viewModels', createViewModels(5));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.m_DataSource.paginator?.pageSize).toBe(5);

    fixture.componentRef.setInput('viewModels', createViewModels(30));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.m_DataSource.paginator?.pageSize).toBe(5);
  });


  it("PageSize wird angepasst wenn Daten aktualisiert werden und neue Ergebnismenge kleiner als der gesetzte Wert ist. Dann wird auf den definierten Default gesetzt", async () => {
    fixture.componentRef.setInput('viewModels', createViewModels(50));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.m_DataSource.paginator?.pageSize).toBe(TabelleComponent.MAX_INITIAL_PAGE_SIZE_BEI_NEU_LADEN);
    
    component.m_DataSource.paginator!.pageSize = 50;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.m_DataSource.paginator?.pageSize).toBe(50);

    fixture.componentRef.setInput('viewModels', createViewModels(30));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.m_DataSource.paginator?.pageSize).toBe(TabelleComponent.MAX_INITIAL_PAGE_SIZE_BEI_NEU_LADEN);
  });


    it("Initial ist PageSize nicht größer als der max Wert definiert in init size obwohl Mehr Daten da sind", async () => {
    fixture.componentRef.setInput('viewModels', createViewModels(50));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.m_DataSource.paginator?.pageSize).toBe(TabelleComponent.MAX_INITIAL_PAGE_SIZE_BEI_NEU_LADEN);
  });


    it("Initiale PageSize wird auf 0 gesetzt wenn keine Daten und wenn dann Ergebnismenge kleiner als der Default ist, wird auf diesen Wert gesetzt auch wenn er nicht in den definierten Werten ist.", async () => {
    fixture.componentRef.setInput('viewModels', createViewModels(0));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.m_DataSource.paginator?.pageSize).toBe(0);

    fixture.componentRef.setInput('viewModels', createViewModels(6));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.m_DataSource.paginator?.pageSize).toBe(6);
  });

  it('sortiert Firmennamen aufsteigend', async () => {
    fixture.componentRef.setInput('viewModels', [
      { id: 1, land: 'DE', firma: 'Zeta GmbH', emissionen: 10 },
      { id: 2, land: 'DE', firma: 'Alpha AG', emissionen: 20 },
      { id: 3, land: 'DE', firma: 'Mitte KG', emissionen: 30 },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();

    const sorted = component.m_DataSource.sortData(
      [...component.m_DataSource.data],
      { active: 'firma', direction: 'asc' } as never,
    );

    expect(sorted.map((item) => item.firma)).toEqual(['Alpha AG', 'Mitte KG', 'Zeta GmbH']);
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
