import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LokaleNavigation } from './lokale-navigation';

describe('LokaleNavigation', () => {
  let component: LokaleNavigation;
  let fixture: ComponentFixture<LokaleNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LokaleNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LokaleNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
