import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTabelle } from './page-tabelle';
import { DatabaseService } from '../../service/database.service/database.service';
import { LokaleNavigationService } from '../../service/lokale-navigation.service';

describe('PageTabelle', () => {
  let component: PageTabelle;
  let fixture: ComponentFixture<PageTabelle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTabelle],
      providers: [
        {
          provide: DatabaseService,
          useValue: {
            getData: () => Promise.resolve([]),
          },
        },
        {
          provide: LokaleNavigationService,
          useValue: {
            nutzeNavigation: () => {},
            deaktivereNavigation: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTabelle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
