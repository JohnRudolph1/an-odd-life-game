// FILE: src/main.ts
// Dependencies: Imports platformBrowserDynamic from @angular/platform-browser-dynamic and AppModule; bootstrapped by Angular CLI.

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
