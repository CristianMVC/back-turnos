import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarRangoService } from './services/agregar-rango.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
  export class RangoResolve implements ResolveHelper.ResolveValue<Rango> {

    constructor(
        private agregarRangoService: AgregarRangoService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<Rango> {
        const emptyRango: Rango = { diasSemana: [], horaFin: '', horaInicio: '', idRow: 0 };
        return ResolveHelper.handleResolveData(
            this.agregarRangoService.getRangoById(
                route.params['idPuntoAtencion'], route.params['idRango']), emptyRango);
    }
}
