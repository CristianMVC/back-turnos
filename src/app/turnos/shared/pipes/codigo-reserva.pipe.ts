import { PipeTransform, Pipe } from '@angular/core';


@Pipe({ name: 'codigoReserva' })
export class CodigoReservaPipe implements PipeTransform {
    transform(codigo: string): string {
        return codigo ? codigo.split('-')[0] : codigo;
    }
}
