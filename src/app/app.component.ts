// FILE: src/app/app.component.ts
// Dependencies: Imports Component from Angular core; consumed by AppModule and hosts MainLayoutComponent in template.

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TransparentSee';
}
