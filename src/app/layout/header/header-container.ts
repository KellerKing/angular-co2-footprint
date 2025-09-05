import { Component, computed } from "@angular/core";
import { HeaderComponent } from "./header-component";
import { HeaderModel } from "./header-model";
import { createViewModels } from "./header-viewmodel-creator";

@Component({
  selector: 'app-header-container',
  template: `<app-header [headerData] = "this.viewModels()"></app-header>`,
  styles: ``,
  imports: [HeaderComponent],
})

export class HeaderContainer {
    viewModels = computed<HeaderModel>(() => createViewModels());
}