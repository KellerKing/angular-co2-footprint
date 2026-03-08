import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LokaleNavigationService {
    isVisible = signal(false);
    darstellbareElemente = signal<LokaleNavigationServiceInputItem[]>([]);

    nutzeNavigation(items: LokaleNavigationServiceInputItem[]) {
        this.darstellbareElemente.set(items);
        this.isVisible.set(true);
    }

    hide() {        
        this.isVisible.set(false);
        this.darstellbareElemente.set([]);
    }
}


export interface LokaleNavigationServiceInputItem {
  label: string;
  fragment: string;
}