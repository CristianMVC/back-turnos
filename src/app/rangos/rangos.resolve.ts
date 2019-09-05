import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RangosService } from './tabla-rangos/services/rangos.service';
import * as ResolveHelper from '../shared/resolve-helper/resolve-helper';

@Injectable()
  export class RangosResolve implements ResolveHelper.ResolveValue<RangosPaginables> {

    constructor(
        private rangosService: RangosService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<RangosPaginables> {
        const emptyRangosPaginables: RangosPaginables = { size: 0, rangos: [] };
        const idPuntoAtencion = route.params['idPuntoAtencion'];
        return ResolveHelper.handleResolveData(this.rangosService.getAllRangos(idPuntoAtencion), emptyRangosPaginables);
    }

}
