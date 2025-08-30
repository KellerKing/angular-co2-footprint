import { Component, computed, inject, input, Input, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { Route, Router } from "@angular/router";
import { HeaderModel } from "./header.model";
import { createViewModels } from "./header-viewmodel.creator";

@Component({
  selector: 'app-header-container',
  template: `<app-header [headerData] = "this.viewModels()"></app-header>`,
  styles: ``,
  imports: [HeaderComponent],
})

export class HeaderContainer implements OnInit {
    //private m_Router = inject(Router);
    
    //routes = signal(this.m_Router.config);
    viewModels = computed<HeaderModel>(() => this.erstelleViewModels());

    erstelleViewModels() : HeaderModel {
        return createViewModels();
    }

    ngOnInit(): void {
        
    }
    
}