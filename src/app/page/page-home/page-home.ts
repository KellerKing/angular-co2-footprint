import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-page-home',
  imports: [ NgOptimizedImage],
  templateUrl: './page-home.html',
  styleUrl: './page-home.css',
})
export class PageHome {}
