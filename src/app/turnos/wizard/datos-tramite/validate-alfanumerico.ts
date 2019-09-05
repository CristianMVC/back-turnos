import { AbstractControl } from '@angular/forms';

export class ValidateAlfanumerico {
    constructor() { }

    alfanumericoValido(input: AbstractControl) {
        const pattern = new RegExp('[a-zA-Z0-9\-]+');

        if (input && input.value && !pattern.test(input.value)) {
            return { alfanumerico: true };
        }
        return null;
    }
}
