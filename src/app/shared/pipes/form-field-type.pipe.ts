import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'formFieldType' })
export class FormFieldTypePipe implements PipeTransform {
    private tiposDeCampos: any = {
        'text': 'Texto',
        'number': 'Número'
    }

    transform(type: string): string {
        return this.tiposDeCampos[type];
    }
}
