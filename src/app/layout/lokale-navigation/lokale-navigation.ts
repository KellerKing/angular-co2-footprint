import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LokaleNavigationService } from '../../service/lokale-navigation.service';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-lokale-navigation',
  imports: [RouterModule],
  templateUrl: './lokale-navigation.html',
  styleUrl: './lokale-navigation.css',
})
export class LokaleNavigation implements AfterViewInit {

  readonly m_NavigationService = inject(LokaleNavigationService);
  private readonly m_OffCanvasElement = viewChild<ElementRef>('offcanvas');
  private m_OffCanvasIstance! : Offcanvas

  readonly navigationItems = computed<LokaleNavigationInputItem[]>(() => this.m_NavigationService.darstellbareElemente().map((item) => ({ label: item.label, fragment: item.fragment })));

  //Später mit Service, damit die Navigation dynamisch ist
  isLeftToRight = input.required<boolean>();

  ngAfterViewInit(): void {
    this.m_OffCanvasIstance = new Offcanvas(this.m_OffCanvasElement()?.nativeElement);
  }

  constructor() {
    effect(() => {
      if (!this.m_NavigationService.isVisible()) this.close();
    });
  }

  close(): void {
    console.log('close');
    this.m_OffCanvasIstance?.hide();
  }

  toggle(): void {
    console.log('toggle');
    this.m_OffCanvasIstance?.toggle();
  }

  onFragmentClicked(fragmentId: string) : void {
    this.navigereZuFragment(fragmentId);
    this.close();
  }

/* Es ist theoretisch keine navigation mit Fragment-Id weil ich nicht über #Fragment gehe, aber so gefällt es mir besser weil einfacher und ich nicht das Problem habe, was passiert wenn ich beim  */
  navigereZuFragment(fragmentId: string) : void {
    if (fragmentId) document.getElementById(fragmentId)?.scrollIntoView({ behavior: 'smooth' });
  }
}


interface LokaleNavigationInputItem {
  label: string;
  fragment: string;
}