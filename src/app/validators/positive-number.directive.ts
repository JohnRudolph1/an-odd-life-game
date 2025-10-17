// FILE: src/app/validators/positive-number.directive.ts
// Dependencies: Provides NG_VALIDATORS directive for template-driven forms; used by AddPriceComponent template.

import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPositiveNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PositiveNumberDirective,
      multi: true,
    },
  ],
})
export class PositiveNumberDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = Number(control.value);
    if (isNaN(value) || value <= 0) {
      return { positiveNumber: true };
    }
    return null;
  }
}
