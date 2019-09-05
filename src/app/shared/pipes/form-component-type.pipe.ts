import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'formComponentType' })
export class FormComponentTypePipe implements PipeTransform {
  private tiposDeComponentes: any = {
    'textbox': 'Campo de Texto',
    'dropdown': 'Menú Desplegable',
    'textarea': 'Área de Texto',
    'radio': 'Botón de Opción',
    'date': 'Campo de Fecha'

  }

  transform(type: string): string {
    return this.tiposDeComponentes[type];
  }
}
