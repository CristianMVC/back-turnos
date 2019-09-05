import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BusquedaTurnoService } from './services/busqueda-turno.service';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class BusquedaTurnoResolve implements Resolve<Observable<ResultadoBusquedaTurno>> {

    constructor(private busquedaTurnoService: BusquedaTurnoService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ResultadoBusquedaTurno> {
        return this.busquedaTurnoService.buscarTurno(route.params.cuil, route.params.codigo);
    }
}
