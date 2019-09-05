import { Injectable } from '@angular/core';

@Injectable()
export class DiasSemanaService {
    getDiasSemana(): string[] {
        return ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    }
}
