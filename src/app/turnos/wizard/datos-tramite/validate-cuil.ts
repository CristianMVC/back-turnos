import { AbstractControl } from '@angular/forms';

export class ValidateCuil {
    // tslint:disable:no-magic-numbers
    private cuilInputAllowed = [0, 8, 13, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

    constructor() { }

    cuilValido(input: AbstractControl) {
        const aMult = [6, 7, 8, 9, 4, 5, 6, 7, 8, 9];
        const numericPattern = new RegExp('^[0-9]{11}$');
        const dashesPattern = new RegExp('^[0-9]{2}-[0-9]{8}-[0-9]{1}$');
        let CUIT: string[];
        let iResult = 0;
        let i: number;

        if (input && input.value && !numericPattern.test(input.value) && !dashesPattern.test(input.value)) {
            // si no cumple con algún patrón: cuil con o sin guiones
            return { cuil: true };
        } else if (input && input.value) {
            CUIT = input.value.replace(/-/g, '').split('');
            // La suma de los productos
            for (i = 0; i <= 9; i++) {
                iResult += +CUIT[i] * aMult[i];
            }
            // El módulo de 11
            iResult = (iResult % 11);
            // Se compara el resultado con el dígito verificador
            return (iResult === +CUIT[10]) ? null : { cuil: true };
        }
        return null;
    }

    cuilInput(event: any, label: string): boolean {
      if (label.toLowerCase().indexOf('cuil') !== -1) {
        return (this.cuilInputAllowed.indexOf(event.which) !== -1);
      }
      return true;
    }
    // tslint:enable:no-magic-numbers
}
