import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent, HomeItem, NavItem } from './header.component';
import { provideRouter } from '@angular/router';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockNavItems : NavItem[] = [
    { label: "Home", link: "/" },
    { label: "Über", link: "/about" },
    { label: "Kontakt", link: "/contact" }
  ];

  const mockHomeItem : HomeItem = {
    logoUrl: 'assets/logo.png',
    homeLink: '/'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("navItems", mockNavItems);
    fixture.componentRef.setInput("homeItem", mockHomeItem);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Unit-Test: toggleNavbar toggelt die Klasse "show" auf dem collapsableNav Element', () => {
    const objektZuTesten = component['collapsableNav']();
    
    expect(objektZuTesten.nativeElement.classList.contains("show")).toBe(false);
    component.toggleNavbar();
    expect(objektZuTesten.nativeElement.classList.contains("show")).toBe(true);
  });
});
