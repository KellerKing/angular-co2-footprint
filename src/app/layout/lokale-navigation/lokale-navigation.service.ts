import { inject, Injectable, signal } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class LokaleNavigationService {
    isVisible = signal(false);
    isOpen = signal(false);
    darstellbareElemente = signal<LokaleNavigationServiceInputItem[]>([]);

    private readonly m_Router = inject(Router);

    constructor() {
        this.m_Router.events.subscribe((event) => {  
            if (event instanceof NavigationStart) 
                this.deaktivereNavigation();
        });
    }

    nutzeNavigation(items: LokaleNavigationServiceInputItem[]) : void {
        this.darstellbareElemente.set(items);
        this.isVisible.set(true);
    }

    deaktivereNavigation() : void {        
        this.isVisible.set(false);
        this.isOpen.set(false);
        this.darstellbareElemente.set([]);
    }

    toggleOpenClose() : void {
        this.isOpen.set(!this.isOpen());
    }
}


export interface LokaleNavigationServiceInputItem {
  label: string;
  fragment: string;
}