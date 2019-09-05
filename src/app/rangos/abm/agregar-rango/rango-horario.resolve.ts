import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AgregarRangoService } from './services/agregar-rango.service';
import * as ResolveHelper from '../../../shared/resolve-helper/resolve-helper';

@Injectable()
  export class RangoHorarioResolve implements ResolveHelper.ResolveValue<RangoHorario> {

    constructor(
        private agregarRangoService: AgregarRangoService
    ) { }

    resolve(route: ActivatedRouteSnapshot): ResolveHelper.ResolveValueStream<RangoHorario> {
        const emptyRangoHorario: RangoHorario = [];
        return ResolveHelper.handleResolveData(this.agregarRangoService.getRangoHorario(), emptyRangoHorario);
    }
}
