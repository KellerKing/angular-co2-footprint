import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LokaleNavigationService } from '../../service/lokale-navigation.service';
import { Offcanvas } from 'bootstrap';
import { SettingsService } from '../../service/settings-service/settings.service';

@Component({
  selector: 'app-lokale-navigation',
  imports: [RouterModule],
  templateUrl: './lokale-navigation.html',
  styleUrl: './lokale-navigation.css',
})
export class LokaleNavigation implements AfterViewInit {
  readonly m_NavigationService = inject(LokaleNavigationService);
  private readonly m_OffCanvasElement = viewChild<ElementRef>('offcanvas');
  readonly settingsService = inject(SettingsService);
  private m_OffCanvasInstance!: Offcanvas;

  readonly navigationItems = computed<LokaleNavigationInputItem[]>(() =>
    this.m_NavigationService
      .darstellbareElemente()
      .map((item) => ({ label: item.label, fragment: item.fragment })),
  );

  ngAfterViewInit(): void {
    this.m_OffCanvasInstance = new Offcanvas(this.m_OffCanvasElement()?.nativeElement);
  }

  constructor() {
    effect(() => {
      if (!this.m_NavigationService.isVisible()) this.close();
    });


    //TODO: Brauche ich das wirklich? 
    // Es könnte sein, dass die Offcanvas-Instanz die Änderung der Richtung nicht mitbekommt, 
    // weil sie ja nur einmalig in ngAfterViewInit erstellt wird. 
    // Das müsste ich testen. Wenn das so ist, dann könnte ich entweder die Offcanvas-Instanz neu erstellen oder veruschen
    // die Richtung der Offcanvas-Instanz zu ändern.
    effect(() => {
      this.settingsService.isRtl();
      this.reInitOffcanvas();
    });
  }

  private reInitOffcanvas(): void {
    const nativeElement = this.m_OffCanvasElement()?.nativeElement;
    if (!nativeElement) return;
    this.m_OffCanvasInstance?.dispose();
    this.m_OffCanvasInstance = new Offcanvas(nativeElement);
  }


  close(): void {
    this.m_OffCanvasInstance?.hide();
  }

  toggle(): void {
    this.m_OffCanvasInstance?.toggle();
  }

  onFragmentClicked(fragmentId: string): void {
    this.navigereZuFragment(fragmentId);
    this.close();
  }

  /* Es ist theoretisch keine navigation mit Fragment-Id weil ich nicht über #Fragment gehe, aber so gefällt es mir besser weil einfacher und ich nicht das Problem habe, was passiert wenn ich beim  */
  navigereZuFragment(fragmentId: string): void {
    if (fragmentId) document.getElementById(fragmentId)?.scrollIntoView({ behavior: 'smooth' });
  }
}

interface LokaleNavigationInputItem {
  label: string;
  fragment: string;
}
